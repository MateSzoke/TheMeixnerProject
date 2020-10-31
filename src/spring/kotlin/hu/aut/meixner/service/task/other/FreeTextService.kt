package hu.aut.meixner.service.task.other

import hu.aut.meixner.dto.task.other.FreeTextRequest
import hu.aut.meixner.dto.task.other.FreeTextResponse
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.task.other.FreeTextRepository
import hu.aut.meixner.service.file.MediaItemService
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class FreeTextService(
        private val repository: FreeTextRepository,
        private val mediaItemService: MediaItemService
) {
    fun createFreeText(request: FreeTextRequest): FreeTextResponse? {
        return repository.save(request.toEntity(owner = currentUser, question = mediaItemService.mediaItemRequestToEntity(request.question)
                ?: return null)).toDomainModel()
    }

    fun updateFreeText(id: Long, request: FreeTextRequest): FreeTextResponse? {
        val freeTextEntity = repository.findByIdOrNull(id) ?: return null
        if (!freeTextEntity.ownerIsTheCurrentUser) return null
        return repository.save(request.toEntity(owner = currentUser, question = mediaItemService.mediaItemRequestToEntity(request.question)
                ?: return null)).toDomainModel()
    }
}