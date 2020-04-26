package hu.aut.meixner.service.task.complex

import hu.aut.meixner.dto.task.complex.SentenceCreationAndSortingRequest
import hu.aut.meixner.dto.task.complex.SentenceCreationAndSortingResponse
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.task.complex.SentenceCreationAndSortingRepository
import org.springframework.stereotype.Service
import java.time.OffsetDateTime

@Service
class SentenceCreationAndSortingService(
        private val repository: SentenceCreationAndSortingRepository
) {

    fun createSentenceCreationAndSorting(request: SentenceCreationAndSortingRequest): SentenceCreationAndSortingResponse {
        return repository.save(request.toEntity(currentUser)).toDomainModel()
    }

    fun updateSentenceCreationAndSorting(id: Long, request: SentenceCreationAndSortingRequest): SentenceCreationAndSortingResponse? {
        val sentenceCreation = repository.findById(id).toNullable ?: return null
        if (!sentenceCreation.ownerIsTheCurrentUser) return null
        return repository.save(
                request.run {
                    sentenceCreation.copy(
                            title = title,
                            sentences = sentences.map { it.toEntity() },
                            difficulty = difficulty,
                            lastModified = OffsetDateTime.now()
                    )
                }.apply { this.id = id }
        ).toDomainModel()
    }
}