package hu.aut.meixner.service.task.complex

import hu.aut.meixner.dto.task.complex.SentenceCreationAndGroupingRequest
import hu.aut.meixner.dto.task.complex.SentenceCreationAndGroupingResponse
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.task.complex.SentenceCreationAndGroupingRepository
import org.springframework.stereotype.Service
import java.time.OffsetDateTime

@Service
class SentenceCreationAndGroupingService(
        private val repository: SentenceCreationAndGroupingRepository
) {
    fun createSentenceCreationAndGrouping(request: SentenceCreationAndGroupingRequest): SentenceCreationAndGroupingResponse {
        return repository.save(request.toEntity(currentUser)).toDomainModel()
    }

    fun updateSentenceCreationAndGrouping(id: Long, request: SentenceCreationAndGroupingRequest): SentenceCreationAndGroupingResponse? {
        val sentenceCreation = repository.findById(id).toNullable ?: return null
        if (!sentenceCreation.ownerIsTheCurrentUser) return null
        return repository.save(
                request.run {
                    sentenceCreation.copy(
                            title = title,
                            sentenceGroups = sentenceGroups.map { it.toEntity() },
                            difficulty = difficulty,
                            lastModified = OffsetDateTime.now()
                    )
                }.apply { this.id = id }
        ).toDomainModel()
    }
}