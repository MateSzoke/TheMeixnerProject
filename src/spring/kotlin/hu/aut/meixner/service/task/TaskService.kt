package hu.aut.meixner.service.task

import hu.aut.meixner.dto.task.TaskResponse
import hu.aut.meixner.extensions.toDTOModel
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.repository.task.easytask.GroupingRepository
import hu.aut.meixner.repository.task.easytask.PairingRepository
import hu.aut.meixner.repository.task.easytask.SentenceCompletionRepository
import org.springframework.stereotype.Service

@Service
class TaskService(
        private val pairingRepository: PairingRepository,
        private val groupingRepository: GroupingRepository,
        private val sentenceCompletionRepository: SentenceCompletionRepository
) {

    fun getTaskById(taskId: Long): TaskResponse? {
        return pairingRepository.findById(taskId).toNullable?.toDTOModel()
                ?: groupingRepository.findById(taskId).toNullable?.toDTOModel()
                ?: sentenceCompletionRepository.findById(taskId).toNullable?.toDTOModel()
    }

}