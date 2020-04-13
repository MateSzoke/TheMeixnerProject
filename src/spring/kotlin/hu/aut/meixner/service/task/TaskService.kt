package hu.aut.meixner.service.task

import hu.aut.meixner.dto.mapping.toEntity
import hu.aut.meixner.dto.task.TaskResponse
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.toNullable
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
        return pairingRepository.findById(taskId).toNullable?.toEntity()
                ?: groupingRepository.findById(taskId).toNullable?.toEntity()
                ?: sentenceCompletionRepository.findById(taskId).toNullable?.toEntity()
                ?: sentenceCreationRepository.findById(taskId).toNullable?.toEntity()
                ?: sortingRepository.findById(taskId).toNullable?.toEntity()
    }

    fun getAllTasks(): List<TaskResponse> {
        return listOf(
                pairingRepository.findAll().map { it.toEntity() },
                groupingRepository.findAll().map { it.toEntity() },
                sentenceCompletionRepository.findAll().map { it.toEntity() },
                sentenceCreationRepository.findAll().map { it.toEntity() },
                sortingRepository.findAll().map { it.toEntity() }
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