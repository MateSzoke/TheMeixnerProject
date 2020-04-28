package hu.aut.meixner.service.task.complex

import hu.aut.meixner.dto.task.complex.SentenceCompletionAndGroupingRequest
import hu.aut.meixner.dto.task.complex.SentenceCompletionAndGroupingResponse
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.task.complex.SentenceCompletionAndGroupingRepository
import org.springframework.stereotype.Service

@Service
class SentenceCompletionAndGroupingService(
        private val repository: SentenceCompletionAndGroupingRepository
) {
    fun createSentenceCompletionAndGrouping(request: SentenceCompletionAndGroupingRequest): SentenceCompletionAndGroupingResponse {
        return repository.save(request.toEntity(currentUser)).toDomainModel()
    }

    fun updateSentenceCompletionAndGrouping(id: Long, request: SentenceCompletionAndGroupingRequest): SentenceCompletionAndGroupingResponse? {
        val sentenceCompletion = repository.findById(id).toNullable ?: return null
        if (!sentenceCompletion.ownerIsTheCurrentUser) return null
        return repository.save(request.toEntity(currentUser).apply { this.id = id }).toDomainModel()
    }
}