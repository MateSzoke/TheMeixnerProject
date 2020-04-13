package hu.aut.meixner.service.task.easy

import hu.aut.meixner.dto.mapping.toDBModel
import hu.aut.meixner.dto.mapping.toEntity
import hu.aut.meixner.dto.task.easy.SentenceCompletionRequest
import hu.aut.meixner.dto.task.easy.SentenceCompletionResponse
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.repository.task.easytask.SentenceCompletionRepository
import org.springframework.stereotype.Service
import java.time.OffsetDateTime

@Service
class SentenceCompletionService(
        private val sentenceCompletionRepository: SentenceCompletionRepository
) {

    fun createSentenceCompletion(sentenceCompletionRequest: SentenceCompletionRequest): SentenceCompletionResponse {
        return sentenceCompletionRepository.save(sentenceCompletionRequest.toDBModel(currentUser)).toEntity()
    }

    fun updateSentenceCompletion(id: Long, sentenceCompletionRequest: SentenceCompletionRequest): SentenceCompletionResponse? {
        val sentenceCompletion = sentenceCompletionRepository.findById(id).toNullable ?: return null
        if (!sentenceCompletion.ownerIsTheCurrentUser) return null
        return sentenceCompletionRepository.save(
                sentenceCompletionRequest.run {
                    sentenceCompletion.copy(
                            title = title,
                            sentence = sentence,
                            options = options.toMutableList(),
                            difficulty = difficulty,
                            lastModified = OffsetDateTime.now()
                    )
                }.apply { this.id = id }
        ).toEntity()
    }

}