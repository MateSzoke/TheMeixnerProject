package hu.aut.meixner.service.task

import hu.aut.meixner.dto.task.TaskResponse
import hu.aut.meixner.extensions.toDTOModel
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.repository.task.easytask.*
import org.springframework.stereotype.Service

@Service
class TaskService(
        private val pairingRepository: PairingRepository,
        private val groupingRepository: GroupingRepository,
        private val sentenceCompletionRepository: SentenceCompletionRepository,
        private val sentenceCreationRepository: SentenceCreationRepository,
        private val sortingRepository: SortingRepository
) {

    fun getTaskById(taskId: Long): TaskResponse? {
        return pairingRepository.findById(taskId).toNullable?.toDTOModel()
                ?: groupingRepository.findById(taskId).toNullable?.toDTOModel()
                ?: sentenceCompletionRepository.findById(taskId).toNullable?.toDTOModel()
                ?: sentenceCreationRepository.findById(taskId).toNullable?.toDTOModel()
                ?: sortingRepository.findById(taskId).toNullable?.toDTOModel()
    }

    fun getAllTasks(): List<TaskResponse> {
        return listOf(pairingRepository.findAll().map { it.toDTOModel() },
                groupingRepository.findAll().map { it.toDTOModel() },
                sentenceCompletionRepository.findAll().map { it.toDTOModel() },
                sentenceCreationRepository.findAll().map { it.toDTOModel() },
                sortingRepository.findAll().map { it.toDTOModel() }
        ).flatten()
    }

}