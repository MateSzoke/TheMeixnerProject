package hu.aut.meixner.service.task

import hu.aut.meixner.dto.task.common.TaskResponse
import hu.aut.meixner.entity.task.complex.*
import hu.aut.meixner.entity.task.easy.*
import hu.aut.meixner.entity.task.other.*
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.log
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.repository.task.complex.*
import hu.aut.meixner.repository.task.easy.*
import hu.aut.meixner.repository.task.other.*
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import kotlin.math.roundToInt

@Service
class TaskService(
        private val pairingRepository: PairingRepository,
        private val groupingRepository: GroupingRepository,
        private val sentenceCompletionRepository: SentenceCompletionRepository,
        private val sentenceCreationRepository: SentenceCreationRepository,
        private val sortingRepository: SortingRepository,
        private val trueFalseRepository: TrueFalseRepository,
        private val memoryGameRepository: MemoryGameRepository,
        private val groupingAndSortingRepository: GroupingAndSortingRepository,
        private val sentenceCreationAndSortingRepository: SentenceCreationAndSortingRepository,
        private val sentenceCreationAndGroupingRepository: SentenceCreationAndGroupingRepository,
        private val sentenceCompletionAndGroupingRepository: SentenceCompletionAndGroupingRepository,
        private val sentenceCompletionAndSortingRepository: SentenceCompletionAndSortingRepository,
        private val sortingAndGroupingRepository: SortingAndGroupingRepository,
        private val blindMapRepository: BlindMapRepository,
        private val timelineRepository: TimelineRepository,
        private val oddOneOutRepository: OddOneOutRepository,
        private val freeTextRepository: FreeTextRepository,
        private val tableRepository: TableRepository
) {

    fun getTaskById(taskId: Long): TaskResponse? {
        return pairingRepository.findByIdOrNull(taskId)?.toDomainModel()
                ?: groupingRepository.findByIdOrNull(taskId)?.toDomainModel()
                ?: sentenceCompletionRepository.findByIdOrNull(taskId)?.toDomainModel()
                ?: sentenceCreationRepository.findByIdOrNull(taskId)?.toDomainModel()
                ?: sortingRepository.findByIdOrNull(taskId)?.toDomainModel()
                ?: trueFalseRepository.findByIdOrNull(taskId)?.toDomainModel()
                ?: memoryGameRepository.findByIdOrNull(taskId)?.toDomainModel()
                ?: groupingAndSortingRepository.findByIdOrNull(taskId)?.toDomainModel()
                ?: sentenceCreationAndSortingRepository.findByIdOrNull(taskId)?.toDomainModel()
                ?: sentenceCreationAndGroupingRepository.findByIdOrNull(taskId)?.toDomainModel()
                ?: sentenceCompletionAndSortingRepository.findByIdOrNull(taskId)?.toDomainModel()
                ?: sentenceCompletionAndGroupingRepository.findByIdOrNull(taskId)?.toDomainModel()
                ?: sortingAndGroupingRepository.findByIdOrNull(taskId)?.toDomainModel()
                ?: blindMapRepository.findByIdOrNull(taskId)?.toDomainModel()
                ?: timelineRepository.findByIdOrNull(taskId)?.toDomainModel()
                ?: oddOneOutRepository.findByIdOrNull(taskId)?.toDomainModel()
                ?: freeTextRepository.findByIdOrNull(taskId)?.toDomainModel()
                ?: tableRepository.findByIdOrNull(taskId)?.toDomainModel()
    }

    fun getAllTasks(): List<TaskResponse> {
        return listOf(
                pairingRepository.findAll().map { it.toDomainModel() },
                groupingRepository.findAll().map { it.toDomainModel() },
                sentenceCompletionRepository.findAll().map { it.toDomainModel() },
                sentenceCreationRepository.findAll().map { it.toDomainModel() },
                sortingRepository.findAll().map { it.toDomainModel() },
                trueFalseRepository.findAll().map { it.toDomainModel() },
                memoryGameRepository.findAll().map { it.toDomainModel() },
                groupingAndSortingRepository.findAll().map { it.toDomainModel() },
                sentenceCreationAndSortingRepository.findAll().map { it.toDomainModel() },
                sentenceCreationAndGroupingRepository.findAll().map { it.toDomainModel() },
                sentenceCompletionAndSortingRepository.findAll().map { it.toDomainModel() },
                sentenceCompletionAndGroupingRepository.findAll().map { it.toDomainModel() },
                sortingAndGroupingRepository.findAll().map { it.toDomainModel() },
                blindMapRepository.findAll().map { it.toDomainModel() },
                timelineRepository.findAll().map { it.toDomainModel() },
                oddOneOutRepository.findAll().map { it.toDomainModel() },
                freeTextRepository.findAll().map { it.toDomainModel() },
                tableRepository.findAll().map { it.toDomainModel() }
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
        tryDelete { trueFalseRepository.deleteById(taskId) }
        tryDelete { memoryGameRepository.deleteById(taskId) }
        tryDelete { groupingAndSortingRepository.deleteById(taskId) }
        tryDelete { sentenceCreationAndSortingRepository.deleteById(taskId) }
        tryDelete { sentenceCreationAndGroupingRepository.deleteById(taskId) }
        tryDelete { sentenceCompletionAndSortingRepository.deleteById(taskId) }
        tryDelete { sentenceCompletionAndGroupingRepository.deleteById(taskId) }
        tryDelete { sortingAndGroupingRepository.deleteById(taskId) }
        tryDelete { blindMapRepository.deleteById(taskId) }
        tryDelete { timelineRepository.deleteById(taskId) }
        tryDelete { oddOneOutRepository.deleteById(taskId) }
        tryDelete { freeTextRepository.deleteById(taskId) }
        tryDelete { tableRepository.deleteById(taskId) }
    }


    fun updateDifficulty(taskId: Long, attempts: Int) {
        val task = pairingRepository.findByIdOrNull(taskId)
                ?: groupingRepository.findByIdOrNull(taskId)
                ?: sentenceCompletionRepository.findByIdOrNull(taskId)
                ?: sentenceCreationRepository.findByIdOrNull(taskId)
                ?: sortingRepository.findByIdOrNull(taskId)
                ?: trueFalseRepository.findByIdOrNull(taskId)
                ?: memoryGameRepository.findByIdOrNull(taskId)
                ?: groupingAndSortingRepository.findByIdOrNull(taskId)
                ?: sentenceCreationAndSortingRepository.findByIdOrNull(taskId)
                ?: sentenceCreationAndGroupingRepository.findByIdOrNull(taskId)
                ?: sentenceCompletionAndSortingRepository.findByIdOrNull(taskId)
                ?: sentenceCompletionAndGroupingRepository.findByIdOrNull(taskId)
                ?: sortingAndGroupingRepository.findByIdOrNull(taskId)
                ?: blindMapRepository.findByIdOrNull(taskId)
                ?: timelineRepository.findByIdOrNull(taskId)
                ?: oddOneOutRepository.findByIdOrNull(taskId)
                ?: freeTextRepository.findByIdOrNull(taskId)
                ?: tableRepository.findByIdOrNull(taskId) ?: return

        log("difficulty: ${task.difficulty}, attempts: $attempts, difference: ${(task.difficulty / 10.0).roundToInt() - attempts}")
        task.difficulty -= (task.difficulty / 10.0).roundToInt() - attempts
        log("new difficulty: ${task.difficulty}")

        if (task as? PairingEntity != null)
            pairingRepository.save(task)
        if (task as? GroupingEntity != null)
            groupingRepository.save(task)
        if (task as? SentenceCompletionEntity != null)
            sentenceCompletionRepository.save(task)
        if (task as? SentenceCreationEntity != null)
            sentenceCreationRepository.save(task)
        if (task as? SortingEntity != null)
            sortingRepository.save(task)
        if (task as? TrueFalseEntity != null)
            trueFalseRepository.save(task)
        if (task as? MemoryGameEntity != null)
            memoryGameRepository.save(task)
        if (task as? GroupingAndSortingEntity != null)
            groupingAndSortingRepository.save(task)
        if (task as? SentenceCreationAndSortingEntity != null)
            sentenceCreationAndSortingRepository.save(task)
        if (task as? SentenceCreationAndGroupingEntity != null)
            sentenceCreationAndGroupingRepository.save(task)
        if (task as? SentenceCompletionAndSortingEntity != null)
            sentenceCompletionAndSortingRepository.save(task)
        if (task as? SentenceCompletionAndGroupingEntity != null)
            sentenceCompletionAndGroupingRepository.save(task)
        if (task as? SortingAndGroupingEntity != null)
            sortingAndGroupingRepository.save(task)
        if (task as? BlindMapEntity != null)
            blindMapRepository.save(task)
        if (task as? TimelineEntity != null)
            timelineRepository.save(task)
        if (task as? OddOneOutEntity != null)
            oddOneOutRepository.save(task)
        if (task as? FreeTextEntity != null)
            freeTextRepository.save(task)
        if (task as? TableEntity != null)
            tableRepository.save(task)
    }
}