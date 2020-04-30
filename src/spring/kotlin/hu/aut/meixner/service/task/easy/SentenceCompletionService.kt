package hu.aut.meixner.service.task.easy

import hu.aut.meixner.dto.task.easy.SentenceCompletionRequest
import hu.aut.meixner.dto.task.easy.SentenceCompletionResponse
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.task.easy.SentenceCompletionRepository
import org.springframework.stereotype.Service

@Service
class SentenceCompletionService(
        private val sentenceCompletionRepository: SentenceCompletionRepository
) {

    fun createSentenceCompletion(sentenceCompletionRequest: SentenceCompletionRequest): SentenceCompletionResponse {
        return sentenceCompletionRepository.save(sentenceCompletionRequest.toEntity(currentUser)).toDomainModel()
    }

    fun updateSentenceCompletion(id: Long, sentenceCompletionRequest: SentenceCompletionRequest): SentenceCompletionResponse? {
        val sentenceCompletion = sentenceCompletionRepository.findById(id).toNullable ?: return null
        if (!sentenceCompletion.ownerIsTheCurrentUser) return null
        return sentenceCompletionRepository.save(
                sentenceCompletionRequest.toEntity(currentUser).apply { this.id = id }
        ).toDomainModel()
    }

}