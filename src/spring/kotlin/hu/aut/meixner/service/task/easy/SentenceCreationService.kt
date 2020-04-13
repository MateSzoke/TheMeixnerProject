package hu.aut.meixner.service.task.easy

import hu.aut.meixner.dto.mapping.toDBModel
import hu.aut.meixner.dto.mapping.toEntity
import hu.aut.meixner.dto.task.easy.SentenceCreationRequest
import hu.aut.meixner.dto.task.easy.SentenceCreationResponse
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.repository.task.easytask.SentenceCreationRepository
import hu.aut.meixner.service.auth.UserService
import org.springframework.stereotype.Service
import java.time.OffsetDateTime

@Service
class SentenceCreationService(
        internal val sentenceCreationRepository: SentenceCreationRepository,
        private val userService: UserService
) {

    fun createSentenceCreation(sentenceCreationRequest: SentenceCreationRequest): SentenceCreationResponse {
        return sentenceCreationRepository.save(sentenceCreationRequest.toDBModel(userService.getCurrentUsername())).toEntity()
    }

    fun updateSentenceCreation(id: Long, sentenceCreationRequest: SentenceCreationRequest): SentenceCreationResponse? {
        val sentenceCreation = sentenceCreationRepository.findById(id).toNullable ?: return null
        return sentenceCreationRepository.save(
                sentenceCreationRequest.run {
                    sentenceCreation.copy(
                            title = title,
                            sentences = sentences.map { it.toDBModel() },
                            lastModified = OffsetDateTime.now()
                    )
                }.apply { this.id = id }
        ).toEntity()
    }

}