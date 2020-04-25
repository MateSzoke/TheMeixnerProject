package hu.aut.meixner.service.task

import hu.aut.meixner.dto.task.common.TaskResponse
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.repository.task.easytask.*
import org.springframework.dao.EmptyResultDataAccessException
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
        return pairingRepository.findById(taskId).toNullable?.toDomainModel()
                ?: groupingRepository.findById(taskId).toNullable?.toDomainModel()
                ?: sentenceCompletionRepository.findById(taskId).toNullable?.toDomainModel()
                ?: sentenceCreationRepository.findById(taskId).toNullable?.toDomainModel()
                ?: sortingRepository.findById(taskId).toNullable?.toDomainModel()
    }

    fun getAllTasks(): List<TaskResponse> {
        return listOf(
                pairingRepository.findAll().map { it.toDomainModel() },
                groupingRepository.findAll().map { it.toDomainModel() },
                sentenceCompletionRepository.findAll().map { it.toDomainModel() },
                sentenceCreationRepository.findAll().map { it.toDomainModel() },
                sortingRepository.findAll().map { it.toDomainModel() }
        )
                .flatten()
                .sortedBy { it.lastModified }
    }

    fun getMyTasks(): List<TaskResponse> {
        return getAllTasks().filter { it.owner == currentUser }
    }

    fun deleteTaskById(taskId: Long) {
        if (getTaskById(taskId)?.owner != currentUser) return

        fun tryDelete(delete: () -> Unit) {
            try {
                delete()
            } catch (e: EmptyResultDataAccessException) {
            }
        }
        tryDelete { pairingRepository.deleteById(taskId) }
        tryDelete { groupingRepository.deleteById(taskId) }
        tryDelete { sentenceCompletionRepository.deleteById(taskId) }
        tryDelete { sentenceCreationRepository.deleteById(taskId) }
        tryDelete { sortingRepository.deleteById(taskId) }
    }

}