package hu.aut.meixner.service.task.complex

import hu.aut.meixner.dto.task.complex.SentenceCompletionAndSortingRequest
import hu.aut.meixner.dto.task.complex.SentenceCompletionAndSortingResponse
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.task.complex.SentenceCompletionAndSortingRepository
import org.springframework.stereotype.Service
import java.time.OffsetDateTime

@Service
class SentenceCompletionAndSortingService(
        private val repository: SentenceCompletionAndSortingRepository
) {

    fun createSentenceCompletionAndSorting(request: SentenceCompletionAndSortingRequest): SentenceCompletionAndSortingResponse {
        return repository.save(request.toEntity(currentUser)).toDomainModel()
    }

    fun updateSentenceCompletionAndSorting(id: Long, request: SentenceCompletionAndSortingRequest): SentenceCompletionAndSortingResponse? {
        val sentenceCompletion = repository.findById(id).toNullable ?: return null
        if (!sentenceCompletion.ownerIsTheCurrentUser) return null
        return repository.save(
                request.run {
                    sentenceCompletion.copy(
                            title = title,
                            sentences = sentences.map { it.toEntity() },
                            difficulty = difficulty,
                            lastModified = OffsetDateTime.now()
                    )
                }.apply { this.id = id }
        ).toDomainModel()
    }
}