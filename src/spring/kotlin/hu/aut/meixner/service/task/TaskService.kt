package hu.aut.meixner.service.task

import hu.aut.meixner.dto.task.common.TaskResponse
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.repository.task.complex.*
import hu.aut.meixner.repository.task.easy.*
import hu.aut.meixner.repository.task.other.BlindMapRepository
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.stereotype.Service

@Service
class TaskService(
        private val pairingRepository: PairingRepository,
        private val groupingRepository: GroupingRepository,
        private val sentenceCompletionRepository: SentenceCompletionRepository,
        private val sentenceCreationRepository: SentenceCreationRepository,
        private val sortingRepository: SortingRepository,
        private val groupingAndSortingRepository: GroupingAndSortingRepository,
        private val sentenceCreationAndSortingRepository: SentenceCreationAndSortingRepository,
        private val sentenceCreationAndGroupingRepository: SentenceCreationAndGroupingRepository,
        private val sentenceCompletionAndSortingRepository: SentenceCompletionAndGroupingRepository,
        private val sentenceCompletionAndGroupingRepository: SentenceCompletionAndSortingRepository,
        private val sortingAndGroupingRepository: SortingAndGroupingRepository,
        private val blindMapRepository: BlindMapRepository
) {

    fun getTaskById(taskId: Long): TaskResponse? {
        return pairingRepository.findById(taskId).toNullable?.toDomainModel()
                ?: groupingRepository.findById(taskId).toNullable?.toDomainModel()
                ?: sentenceCompletionRepository.findById(taskId).toNullable?.toDomainModel()
                ?: sentenceCreationRepository.findById(taskId).toNullable?.toDomainModel()
                ?: sortingRepository.findById(taskId).toNullable?.toDomainModel()
                ?: groupingAndSortingRepository.findById(taskId).toNullable?.toDomainModel()
                ?: sentenceCreationAndSortingRepository.findById(taskId).toNullable?.toDomainModel()
                ?: sentenceCreationAndGroupingRepository.findById(taskId).toNullable?.toDomainModel()
                ?: sentenceCompletionAndSortingRepository.findById(taskId).toNullable?.toDomainModel()
                ?: sentenceCompletionAndGroupingRepository.findById(taskId).toNullable?.toDomainModel()
                ?: sortingAndGroupingRepository.findById(taskId).toNullable?.toDomainModel()
                ?: blindMapRepository.findById(taskId).toNullable?.toDomainModel()
    }

    fun getAllTasks(): List<TaskResponse> {
        return listOf(
                pairingRepository.findAll().map { it.toDomainModel() },
                groupingRepository.findAll().map { it.toDomainModel() },
                sentenceCompletionRepository.findAll().map { it.toDomainModel() },
                sentenceCreationRepository.findAll().map { it.toDomainModel() },
                sortingRepository.findAll().map { it.toDomainModel() },
                groupingAndSortingRepository.findAll().map { it.toDomainModel() },
                sentenceCreationAndSortingRepository.findAll().map { it.toDomainModel() },
                sentenceCreationAndGroupingRepository.findAll().map { it.toDomainModel() },
                sentenceCompletionAndSortingRepository.findAll().map { it.toDomainModel() },
                sentenceCompletionAndGroupingRepository.findAll().map { it.toDomainModel() },
                sortingAndGroupingRepository.findAll().map { it.toDomainModel() },
                blindMapRepository.findAll().map { it.toDomainModel() }
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
        tryDelete { groupingAndSortingRepository.deleteById(taskId) }
        tryDelete { sentenceCreationAndSortingRepository.deleteById(taskId) }
        tryDelete { sentenceCreationAndGroupingRepository.deleteById(taskId) }
        tryDelete { sentenceCompletionAndSortingRepository.deleteById(taskId) }
        tryDelete { sentenceCompletionAndGroupingRepository.deleteById(taskId) }
        tryDelete { sortingAndGroupingRepository.deleteById(taskId) }
        tryDelete { blindMapRepository.deleteById(taskId) }
    }

}