package hu.aut.meixner.service.task

import hu.aut.meixner.dto.task.TaskResponse
import hu.aut.meixner.dto.task.easy.*
import hu.aut.meixner.extensions.toDBModel
import hu.aut.meixner.extensions.toDTOModel
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.repository.task.easytask.GroupingRepository
import hu.aut.meixner.repository.task.easytask.PairingRepository
import hu.aut.meixner.repository.task.easytask.SentenceCompletionRepository
import org.springframework.stereotype.Service
import java.time.OffsetDateTime

@Service
class EasyTaskService(
        private val pairingRepository: PairingRepository,
        private val groupingRepository: GroupingRepository,
        private val sentenceCompletionRepository: SentenceCompletionRepository
) {

    fun getTaskById(taskId: Long): TaskResponse? {
        return pairingRepository.findById(taskId).toNullable?.toDTOModel()
                ?: groupingRepository.findById(taskId).toNullable?.toDTOModel()
                ?: sentenceCompletionRepository.findById(taskId).toNullable?.toDTOModel()
    }

    //region Pairing
    fun createPairing(pairing: PairingRequest): PairingResponse {
        return pairingRepository.save(pairing.toDBModel()).toDTOModel()
    }

    fun getPairingById(id: Long): PairingResponse? {
        return pairingRepository.findById(id).toNullable?.toDTOModel() ?: return null
    }

    fun updatePairing(id: Long, pairingRequest: PairingRequest): PairingResponse? {
        val pairing = pairingRepository.findById(id).toNullable ?: return null
        return pairingRepository.save(
                pairingRequest.run {
                    pairing.copy(
                            title = title,
                            pairs = pairs.map { it.toDBModel() },
                            lastModified = OffsetDateTime.now()
                    )
                }
        ).toDTOModel()
    }

    fun deletePairing(id: Long) {
        val deletedPairing = pairingRepository.findById(id).toNullable ?: return
        pairingRepository.delete(deletedPairing)
    }
    //endregion

    //region Grouping
    fun createGrouping(groupingRequest: GroupingRequest): GroupingResponse {
        return groupingRepository.save(groupingRequest.toDBModel()).toDTOModel()
    }

    fun getGroupingById(id: Long): GroupingResponse? {
        return groupingRepository.findById(id).toNullable?.toDTOModel() ?: return null
    }

    fun updateGrouping(id: Long, groupingRequest: GroupingRequest): GroupingResponse? {
        val grouping = groupingRepository.findById(id).toNullable ?: return null
        return groupingRepository.save(
                groupingRequest.run {
                    grouping.copy(
                            title = title,
                            groups = groups.map { it.toDBModel() },
                            lastModified = OffsetDateTime.now()
                    )
                }
        ).toDTOModel()
    }

    fun deleteGrouping(id: Long) {
        val deletedGrouping = groupingRepository.findById(id).toNullable ?: return
        groupingRepository.delete(deletedGrouping)
    }
    //endregion

    //region SentenceCompletion
    fun createSentenceCompletion(sentenceCompletionRequest: SentenceCompletionRequest): SentenceCompletionResponse {
        return sentenceCompletionRepository.save(sentenceCompletionRequest.toDBModel()).toDTOModel()
    }

    fun getSentenceCompletionById(id: Long): SentenceCompletionResponse? {
        return sentenceCompletionRepository.findById(id).toNullable?.toDTOModel() ?: return null
    }

    fun updateSentenceCompletion(id: Long, sentenceCompletionRequest: SentenceCompletionRequest): SentenceCompletionResponse? {
        val sentenceCompletion = sentenceCompletionRepository.findById(id).toNullable ?: return null
        return sentenceCompletionRepository.save(
                sentenceCompletionRequest.run {
                    sentenceCompletion.copy(
                            title = title,
                            sentence = sentence,
                            options = options,
                            lastModified = OffsetDateTime.now()
                    )
                }
        ).toDTOModel()
    }

    fun deleteSentenceCompletion(id: Long) {
        val deletedSentenceCompletion = sentenceCompletionRepository.findById(id).toNullable ?: return
        sentenceCompletionRepository.delete(deletedSentenceCompletion)
    }
    //endregion


}