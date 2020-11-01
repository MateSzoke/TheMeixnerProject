package hu.aut.meixner.service.task.complex

import hu.aut.meixner.dto.task.complex.SentenceCreationAndGroupingRequest
import hu.aut.meixner.dto.task.complex.SentenceCreationAndGroupingResponse
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.task.complex.SentenceCreationAndGroupingRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class SentenceCreationAndGroupingService(
        private val repository: SentenceCreationAndGroupingRepository
) {
    fun createSentenceCreationAndGrouping(request: SentenceCreationAndGroupingRequest): SentenceCreationAndGroupingResponse {
        return repository.save(request.toEntity(currentUser)).toDomainModel()
    }

    fun updateSentenceCreationAndGrouping(id: Long, request: SentenceCreationAndGroupingRequest): SentenceCreationAndGroupingResponse? {
        val sentenceCreation = repository.findByIdOrNull(id) ?: return null
        if (!sentenceCreation.ownerIsTheCurrentUser) return null
        return repository.save(request.toEntity(currentUser).apply { this.id = id }).toDomainModel()
    }
}