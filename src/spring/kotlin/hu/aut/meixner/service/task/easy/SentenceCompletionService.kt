package hu.aut.meixner.service.task.easy

import hu.aut.meixner.dto.task.easy.SentenceCompletionRequest
import hu.aut.meixner.dto.task.easy.SentenceCompletionResponse
import hu.aut.meixner.extensions.toDBModel
import hu.aut.meixner.extensions.toDTOModel
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.repository.task.easytask.SentenceCompletionRepository
import org.springframework.stereotype.Service
import java.time.OffsetDateTime

@Service
class SentenceCompletionService(
        private val sentenceCompletionRepository: SentenceCompletionRepository
) {

    fun createSentenceCompletion(sentenceCompletionRequest: SentenceCompletionRequest): SentenceCompletionResponse {
        return sentenceCompletionRepository.save(sentenceCompletionRequest.toDBModel()).toDTOModel()
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
                }.apply { this.id = id }
        ).toDTOModel()
    }

}