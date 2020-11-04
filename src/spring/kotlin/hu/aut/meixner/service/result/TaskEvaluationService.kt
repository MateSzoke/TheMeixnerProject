package hu.aut.meixner.service.result

import hu.aut.meixner.dto.result.TaskResultResponse
import hu.aut.meixner.dto.task.common.TaskResponse
import hu.aut.meixner.dto.task.complex.*
import hu.aut.meixner.dto.task.easy.*
import hu.aut.meixner.dto.task.student.complex.*
import hu.aut.meixner.dto.task.student.easy.*
import hu.aut.meixner.entity.result.StudentEntity
import hu.aut.meixner.entity.result.TaskResultEntity
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.repository.result.StudentRepository
import hu.aut.meixner.repository.result.TaskResultRepository
import hu.aut.meixner.service.auth.UserService
import hu.aut.meixner.service.task.TaskService
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class TaskEvaluationService(
        private val taskService: TaskService,
        private val taskResultRepository: TaskResultRepository,
        private val studentRepository: StudentRepository,
        private val userService: UserService
) {

    fun evaluatePairing(taskId: Long, taskRequest: PairingTaskRequest): TaskResultResponse? {
        val (student, taskResult) = getStudentAndTask<PairingResponse>(taskId) ?: return null
        val currentResult = mutableListOf<Boolean>()
        taskRequest.pairs.forEach { resultPair ->
            var found = false
            taskResult.pairs.forEach { requestPair ->
                if (requestPair.pair.equalsResultMediaItems(resultPair.pair)) found = true
            }
            currentResult.add(found)
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
        taskRequest.groups.forEach { groupResult ->
            var found = false
            taskResult.groups.find { it.name == groupResult.name }?.let {
                if (it.elements.equalsResultMediaItems(groupResult.elements)) found = true
            }
            currentResult.add(found)
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
        val currentResult = taskResult.elements.compareSortedResultMediaItems(taskRequest.elements)
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
            var found = false
            taskRequest.sentences.find { it.sentenceTitle == sentenceResult.sentenceTitle }?.let {
                if (it.parts == sentenceResult.parts) found = true
            }
            currentResult.add(found)
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
        val currentResult = listOf(taskResult.trueItems.equalsResultMediaItems(taskRequest.trueItems),
                taskResult.falseItems.equalsResultMediaItems(taskRequest.falseItems))
        return saveTaskRequest(
                student = student,
                taskId = taskId,
                taskResult = taskResult,
                currentResult = currentResult,
                attempts = taskRequest.attempts,
                resultPercentage = if (currentResult.all { it }) 1.0 else 0.0
        )
    }

    fun evaluateMemoryGame(taskId: Long, taskRequest: MemoryGameTaskRequest): TaskResultResponse? {
        val (student, taskResult) = getStudentAndTask<MemoryGameResponse>(taskId) ?: return null
        val currentResult = mutableListOf<Boolean>()
        taskRequest.pairs.forEach { resultPair ->
            var found = false
            taskResult.pairs.forEach { requestPair ->
                if (requestPair.pair.equalsResultMediaItems(resultPair.pair)) found = true
            }
            currentResult.add(found)
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

    fun evaluateGroupingAndSorting(taskId: Long, taskRequest: GroupingAndSortingTaskRequest): TaskResultResponse? {
        val (student, taskResult) = getStudentAndTask<GroupingAndSortingResponse>(taskId) ?: return null
        val currentResult = mutableListOf<Boolean>()
        taskRequest.groups.forEach { groupRequest ->
            var found = false
            taskResult.groups.find { it.name == groupRequest.name }?.let {
                if (it.elements.equalsSortedResultMediaItems(groupRequest.elements)) found = true
            }
            currentResult.add(found)
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

    fun evaluateSentenceCompletionAndSorting(taskId: Long, taskRequest: SentenceCompletionAndSortingTaskRequest): TaskResultResponse? {
        val (student, taskResult) = getStudentAndTask<SentenceCompletionAndSortingResponse>(taskId) ?: return null
        val currentResult = mutableListOf<Boolean>()
        taskRequest.sentences.zip(taskResult.sentences).forEach { (requestSentence, resultSentence) ->
            currentResult.add(requestSentence.options == resultSentence.options)
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

    fun evaluateSentenceCompletionAndGrouping(taskId: Long, taskRequest: SentenceCompletionAndGroupingTaskRequest): TaskResultResponse? {
        val (student, taskResult) = getStudentAndTask<SentenceCompletionAndGroupingResponse>(taskId) ?: return null
        val currentResult = mutableListOf<Boolean>()
        taskRequest.sentenceGroups.forEach { sentenceList ->
            var found = false
            taskResult.sentenceGroups.find { it.groupTitle == sentenceList.groupTitle }?.sentences?.zip(sentenceList.sentences)
                    ?.forEach { (requestSentence, resultSentence) ->
                        if (requestSentence.options.equalsTo(resultSentence.options)) found = true
                    }
            currentResult.add(found)
        }
        return saveTaskRequest(
                student = student,
                taskId = taskId,
                taskResult = taskResult,
                currentResult = currentResult,
                attempts = taskRequest.attempts,
                resultPercentage = calculateResultPercentage(taskRequest.sentenceGroups, taskResult.sentenceGroups, currentResult)
        )
    }

    fun evaluateSentenceCreationAndGrouping(taskId: Long, taskRequest: SentenceCreationAndGroupingTaskRequest): TaskResultResponse? {
        val (student, taskResult) = getStudentAndTask<SentenceCreationAndGroupingResponse>(taskId) ?: return null
        val currentResult = mutableListOf<Boolean>()
        taskRequest.sentenceGroups.forEach { sentenceList ->
            var found = false
            taskResult.sentenceGroups.find { it.groupTitle == sentenceList.groupTitle }?.sentences?.zip(sentenceList.sentences)
                    ?.forEach { (requestSentence, resultSentence) ->
                        if (requestSentence.parts.equalsTo(resultSentence.parts)) found = true
                    }
            currentResult.add(found)
        }
        return saveTaskRequest(
                student = student,
                taskId = taskId,
                taskResult = taskResult,
                currentResult = currentResult,
                attempts = taskRequest.attempts,
                resultPercentage = calculateResultPercentage(taskRequest.sentenceGroups, taskResult.sentenceGroups, currentResult)
        )
    }

    fun evaluateSentenceCreationAndSorting(taskId: Long, taskRequest: SentenceCreationAndSortingTaskRequest): TaskResultResponse? {
        val (student, taskResult) = getStudentAndTask<SentenceCreationAndSortingResponse>(taskId) ?: return null
        val currentResult = mutableListOf<Boolean>()
        taskRequest.sentences.zip(taskResult.sentences).forEach { (requestSentence, resultSentence) ->
            currentResult.add(requestSentence.parts == resultSentence.parts)
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

    fun evaluateSortingAndGrouping(taskId: Long, taskRequest: SortingAndGroupingTaskRequest): TaskResultResponse? {
        val (student, taskResult) = getStudentAndTask<SortingAndGroupingResponse>(taskId) ?: return null
        val currentResult = mutableListOf<Boolean>()
        taskRequest.groups.zip(taskResult.groups).forEach { (requestGroup, resultGroup) ->
            currentResult.add(resultGroup.elements.equalsResultMediaItems(requestGroup.elements))
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

    private fun <T : TaskResponse> getStudentAndTask(taskId: Long): Pair<StudentEntity, T>? {
        val user = userService.getUser() ?: return null
        val student = studentRepository.findByIdOrNull(user.id) ?: return null
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