package hu.aut.meixner.service.task.easy

import hu.aut.meixner.dto.task.easy.SentenceCreationRequest
import hu.aut.meixner.dto.task.easy.SentenceCreationResponse
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.task.easy.SentenceCreationRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class SentenceCreationService(
        internal val sentenceCreationRepository: SentenceCreationRepository
) {

    fun createSentenceCreation(sentenceCreationRequest: SentenceCreationRequest): SentenceCreationResponse {
        return sentenceCreationRepository.save(sentenceCreationRequest.toEntity(currentUser)).toDomainModel()
    }

    fun updateSentenceCreation(id: Long, sentenceCreationRequest: SentenceCreationRequest): SentenceCreationResponse? {
        val sentenceCreation = sentenceCreationRepository.findByIdOrNull(id) ?: return null
        if (!sentenceCreation.ownerIsTheCurrentUser) return null
        return sentenceCreationRepository.save(
                sentenceCreationRequest.toEntity(currentUser).apply { this.id = id }
        ).toDomainModel()
    }

}