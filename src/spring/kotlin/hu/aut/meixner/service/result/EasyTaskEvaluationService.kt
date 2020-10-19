package hu.aut.meixner.service.result

import hu.aut.meixner.dto.result.TaskResultResponse
import hu.aut.meixner.dto.task.common.TaskResponse
import hu.aut.meixner.dto.task.easy.*
import hu.aut.meixner.dto.task.student.easy.*
import hu.aut.meixner.entity.result.StudentEntity
import hu.aut.meixner.entity.result.TaskResultEntity
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.repository.result.StudentRepository
import hu.aut.meixner.repository.result.TaskResultRepository
import hu.aut.meixner.service.auth.UserService
import hu.aut.meixner.service.task.TaskService
import org.springframework.stereotype.Service

@Service
class EasyTaskEvaluationService(
        private val taskService: TaskService,
        private val taskResultRepository: TaskResultRepository,
        private val studentRepository: StudentRepository,
        private val userService: UserService
) {

    fun evaluatePairing(taskId: Long, taskRequest: PairingTaskRequest): TaskResultResponse? {
        val (student, taskResult) = getStudentAndTask<PairingResponse>(taskId) ?: return null
        var match = 0
        taskResult.pairs.filter { it.pair.isNotEmpty() }.forEach { resultPair ->
            taskRequest.pairs.forEach { requestPair ->
                if (requestPair.pair.equalsResultMediaItems(resultPair.pair)) match++
            }
        }
        return saveTaskRequest(student, taskId, taskResult, calculateResultPercentage(taskRequest.pairs, taskResult.pairs, match))
    }

    fun evaluateGrouping(taskId: Long, taskRequest: GroupingTaskRequest): TaskResultResponse? {
        val (student, taskResult) = getStudentAndTask<GroupingResponse>(taskId) ?: return null
        var match = 0
        taskResult.groups.forEach { groupResult ->
            taskRequest.groups.find { it.name == groupResult.name }?.let {
                if (it.elements.equalsResultMediaItems(groupResult.elements)) match++
            }
        }
        return saveTaskRequest(student, taskId, taskResult, calculateResultPercentage(taskRequest.groups, taskResult.groups, match))
    }

    fun evaluateSorting(taskId: Long, taskRequest: SortingTaskRequest): TaskResultResponse? {
        val (student, taskResult) = getStudentAndTask<SortingResponse>(taskId) ?: return null
        val resultPercentage = taskRequest.elements.compareSortedResultMediaItems(taskResult.elements)
        return saveTaskRequest(student, taskId, taskResult, resultPercentage)
    }

    fun evaluateSentenceCreation(taskId: Long, taskRequest: SentenceCreationTaskRequest): TaskResultResponse? {
        val (student, taskResult) = getStudentAndTask<SentenceCreationResponse>(taskId) ?: return null
        var match = 0
        taskResult.sentences.forEach { sentenceResult ->
            taskRequest.sentences.find { it.sentenceTitle == sentenceResult.sentenceTitle }?.let {
                if (it.parts == sentenceResult.parts) match++
            }
        }
        return saveTaskRequest(student, taskId, taskResult, calculateResultPercentage(taskRequest.sentences, taskResult.sentences, match))
    }

    fun evaluateSentenceCompletion(taskId: Long, taskRequest: SentenceCompletionTaskRequest): TaskResultResponse? {
        val (student, taskResult) = getStudentAndTask<SentenceCompletionResponse>(taskId) ?: return null
        var match = 0
        taskRequest.options.zip(taskResult.options).forEach { (requestOption, resultOption) ->
            if (requestOption == resultOption) match++
        }
        val resultPercentage = if (taskRequest.options.size <= taskResult.options.size)
            match / taskRequest.options.size.toDouble()
        else
            match / taskResult.options.size.toDouble()
        return saveTaskRequest(student, taskId, taskResult, resultPercentage)
    }

    fun evaluateTrueFalse(taskId: Long, taskRequest: TrueFalseTaskRequest): TaskResultResponse? {
        val (student, taskResult) = getStudentAndTask<TrueFalseResponse>(taskId) ?: return null
        val resultPercentage = (taskRequest.trueItems.compareResultMediaItems(taskResult.trueItems)
                + taskRequest.falseItems.compareResultMediaItems(taskResult.falseItems)) / 2.0
        return saveTaskRequest(student, taskId, taskResult, resultPercentage)
    }

    fun evaluateMemoryGame(taskId: Long, taskRequest: MemoryGameTaskRequest): TaskResultResponse? {
        val (student, taskResult) = getStudentAndTask<MemoryGameResponse>(taskId) ?: return null
        var match = 0
        taskResult.pairs.forEach { resultPair ->
            taskRequest.pairs.forEach { requestPair ->
                if (requestPair.pair.equalsResultMediaItems(resultPair.pair)) match++
            }
        }
        return saveTaskRequest(student, taskId, taskResult, calculateResultPercentage(taskRequest.pairs, taskResult.pairs, match))
    }

    private fun <T : TaskResponse> getStudentAndTask(taskId: Long): Pair<StudentEntity, T>? {
        val user = userService.getUser() ?: return null
        val student = studentRepository.findById(user.id).toNullable ?: return null
        val taskResult = taskService.getTaskById(taskId) as? T ?: return null
        return Pair(student, taskResult)
    }

    private fun calculateResultPercentage(request: List<Any>, result: List<Any>, match: Int): Double {
        return if (request.size >= result.size) match / request.size.toDouble() else match / result.size.toDouble()
    }

    private fun saveTaskRequest(student: StudentEntity, taskId: Long, taskResult: TaskResponse, resultPercentage: Double): TaskResultResponse {
        return taskResultRepository.save(TaskResultEntity(
                student = student,
                resultTaskId = taskId,
                resultPercentage = resultPercentage
        )).toDomainModel(taskResult = taskResult, user = student.user.toDomainModel())
    }
}