package hu.aut.meixner.service.result

import hu.aut.meixner.dto.result.TaskResultResponse
import hu.aut.meixner.dto.task.easy.*
import hu.aut.meixner.entity.result.TaskResultEntity
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.repository.result.StudentRepository
import hu.aut.meixner.repository.result.TaskResultRepository
import hu.aut.meixner.service.task.TaskService
import org.springframework.stereotype.Service

@Service
class EasyTaskEvaluationService(
        private val taskService: TaskService,
        private val taskResultRepository: TaskResultRepository,
        private val studentRepository: StudentRepository
) {

    fun evaluatePairing(userId: Long, taskId: Long, taskRequest: PairingRequest): TaskResultResponse? {
        val student = studentRepository.findById(userId).toNullable ?: return null
        val taskResult = taskService.getTaskById(taskId) ?: return null
        // TODO evaluate
        return taskResultRepository.save(TaskResultEntity(
                student = student,
                resultTaskId = taskId
        )).toDomainModel(taskResult)
    }

    fun evaluateGrouping(userId: Long, taskId: Long, taskRequest: GroupingRequest): TaskResultResponse? {
        val student = studentRepository.findById(userId).toNullable ?: return null
        val taskResult = taskService.getTaskById(taskId) ?: return null
        // TODO evaluate
        return taskResultRepository.save(TaskResultEntity(
                student = student,
                resultTaskId = taskId
        )).toDomainModel(taskResult)
    }

    fun evaluateSorting(userId: Long, taskId: Long, taskRequest: SortingRequest): TaskResultResponse? {
        val student = studentRepository.findById(userId).toNullable ?: return null
        val taskResult = taskService.getTaskById(taskId) ?: return null
        // TODO evaluate
        return taskResultRepository.save(TaskResultEntity(
                student = student,
                resultTaskId = taskId
        )).toDomainModel(taskResult)
    }

    fun evaluateSentenceCreation(userId: Long, taskId: Long, taskRequest: SentenceCreationRequest): TaskResultResponse? {
        val student = studentRepository.findById(userId).toNullable ?: return null
        val taskResult = taskService.getTaskById(taskId) ?: return null
        // TODO evaluate
        return taskResultRepository.save(TaskResultEntity(
                student = student,
                resultTaskId = taskId
        )).toDomainModel(taskResult)
    }

    fun evaluateSentenceCompletion(userId: Long, taskId: Long, taskRequest: SentenceCompletionRequest): TaskResultResponse? {
        val student = studentRepository.findById(userId).toNullable ?: return null
        val taskResult = taskService.getTaskById(taskId) ?: return null
        // TODO evaluate
        return taskResultRepository.save(TaskResultEntity(
                student = student,
                resultTaskId = taskId
        )).toDomainModel(taskResult)
    }

    fun evaluateTrueFalse(userId: Long, taskId: Long, taskRequest: TrueFalseRequest): TaskResultResponse? {
        val student = studentRepository.findById(userId).toNullable ?: return null
        val taskResult = taskService.getTaskById(taskId) ?: return null
        // TODO evaluate
        return taskResultRepository.save(TaskResultEntity(
                student = student,
                resultTaskId = taskId
        )).toDomainModel(taskResult)
    }

    fun evaluateMemoryGame(userId: Long, taskId: Long, taskRequest: MemoryGameRequest): TaskResultResponse? {
        val student = studentRepository.findById(userId).toNullable ?: return null
        val taskResult = taskService.getTaskById(taskId) ?: return null
        // TODO evaluate
        return taskResultRepository.save(TaskResultEntity(
                student = student,
                resultTaskId = taskId
        )).toDomainModel(taskResult)
    }
}