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
        val currentResult = mutableListOf<Boolean>()
        taskResult.pairs.forEach { resultPair ->
            taskRequest.pairs.forEach { requestPair ->
                currentResult.add(requestPair.pair.equalsResultMediaItems(resultPair.pair))
            }
        }
        return saveTaskRequest(
                student = student,
                taskId = taskId,
                taskResult = taskResult,
                currentResult = currentResult,
                attempts = taskRequest.attempts,
                resultPercentage = calculateResultPercentage(taskRequest.pairs.filter { it.pair.isNotEmpty() }, taskResult.pairs, currentResult)
        )
    }

    fun evaluateGrouping(taskId: Long, taskRequest: GroupingTaskRequest): TaskResultResponse? {
        val (student, taskResult) = getStudentAndTask<GroupingResponse>(taskId) ?: return null
        val currentResult = mutableListOf<Boolean>()
        taskResult.groups.forEach { groupResult ->
            taskRequest.groups.find { it.name == groupResult.name }?.let {
                currentResult.add(it.elements.equalsResultMediaItems(groupResult.elements))
            }
        }
        return saveTaskRequest(
                student = student,
                taskId = taskId,
                taskResult = taskResult,
                currentResult = currentResult,
                attempts = taskRequest.attempts,
                resultPercentage = calculateResultPercentage(taskRequest.groups, taskResult.groups, currentResult)
        )
    }

    fun evaluateSorting(taskId: Long, taskRequest: SortingTaskRequest): TaskResultResponse? {
        val (student, taskResult) = getStudentAndTask<SortingResponse>(taskId) ?: return null
        val currentResult = taskRequest.elements.compareSortedResultMediaItems(taskResult.elements)
        return saveTaskRequest(
                student = student,
                taskId = taskId,
                taskResult = taskResult,
                currentResult = currentResult,
                attempts = taskRequest.attempts,
                resultPercentage = calculateResultPercentage(taskRequest.elements, taskResult.elements, currentResult)
        )
    }

    fun evaluateSentenceCreation(taskId: Long, taskRequest: SentenceCreationTaskRequest): TaskResultResponse? {
        val (student, taskResult) = getStudentAndTask<SentenceCreationResponse>(taskId) ?: return null
        val currentResult = mutableListOf<Boolean>()
        taskResult.sentences.forEach { sentenceResult ->
            taskRequest.sentences.find { it.sentenceTitle == sentenceResult.sentenceTitle }?.let {
                currentResult.add(it.parts == sentenceResult.parts)
            }
        }
        return saveTaskRequest(
                student = student,
                taskId = taskId,
                taskResult = taskResult,
                currentResult = currentResult,
                attempts = taskRequest.attempts,
                resultPercentage = calculateResultPercentage(taskRequest.sentences, taskResult.sentences, currentResult)
        )
    }

    fun evaluateSentenceCompletion(taskId: Long, taskRequest: SentenceCompletionTaskRequest): TaskResultResponse? {
        val (student, taskResult) = getStudentAndTask<SentenceCompletionResponse>(taskId) ?: return null
        val currentResult = mutableListOf<Boolean>()
        taskRequest.options.zip(taskResult.options).forEach { (requestOption, resultOption) ->
            currentResult.add(requestOption == resultOption)
        }
        return saveTaskRequest(
                student = student,
                taskId = taskId,
                taskResult = taskResult,
                currentResult = currentResult,
                attempts = taskRequest.attempts,
                resultPercentage = calculateResultPercentage(taskRequest.options, taskResult.options, currentResult)
        )
    }

    fun evaluateTrueFalse(taskId: Long, taskRequest: TrueFalseTaskRequest): TaskResultResponse? {
        val (student, taskResult) = getStudentAndTask<TrueFalseResponse>(taskId) ?: return null
        val currentResult = listOf(taskRequest.trueItems.compareResultMediaItems(taskResult.trueItems),
                taskRequest.falseItems.compareResultMediaItems(taskResult.falseItems))
        return saveTaskRequest(
                student = student,
                taskId = taskId,
                taskResult = taskResult,
                currentResult = currentResult,
                attempts = taskRequest.attempts,
                resultPercentage = if (currentResult.all { it }) 100.0 else 0.0
        )
    }

    fun evaluateMemoryGame(taskId: Long, taskRequest: MemoryGameTaskRequest): TaskResultResponse? {
        val (student, taskResult) = getStudentAndTask<MemoryGameResponse>(taskId) ?: return null
        val currentResult = mutableListOf<Boolean>()
        taskResult.pairs.forEach { resultPair ->
            taskRequest.pairs.forEach { requestPair ->
                currentResult.add(requestPair.pair.equalsResultMediaItems(resultPair.pair))
            }
        }
        return saveTaskRequest(
                student = student,
                taskId = taskId,
                taskResult = taskResult,
                currentResult = currentResult,
                attempts = taskRequest.attempts,
                resultPercentage = calculateResultPercentage(taskRequest.pairs, taskResult.pairs, currentResult)
        )
    }

    private fun <T : TaskResponse> getStudentAndTask(taskId: Long): Pair<StudentEntity, T>? {
        val user = userService.getUser() ?: return null
        val student = studentRepository.findById(user.id).toNullable ?: return null
        val taskResult = taskService.getTaskById(taskId) as? T ?: return null
        return Pair(student, taskResult)
    }

    private fun calculateResultPercentage(request: List<Any>, result: List<Any>, currentResult: List<Boolean>): Double {
        val match = currentResult.count { it }
        return if (request.size >= result.size) match / request.size.toDouble() else match / result.size.toDouble()
    }

    private fun saveTaskRequest(
            student: StudentEntity,
            taskId: Long,
            taskResult: TaskResponse?,
            currentResult: List<Boolean>,
            resultPercentage: Double,
            attempts: Int
    ): TaskResultResponse {
        val taskResultEntity = TaskResultEntity(
                student = student,
                resultTaskId = taskId,
                attempts = attempts + 1,
                resultPercentage = resultPercentage,
        )
        if (resultPercentage == 1.0) {
            taskResultRepository.save(taskResultEntity)
        }
        return taskResultEntity.toDomainModel(taskResult = taskResult, currentResult = currentResult, user = student.user.toDomainModel())
    }
}