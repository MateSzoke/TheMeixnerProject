package hu.aut.meixner.service.task.other

import hu.aut.meixner.dto.task.other.BlindMapRequest
import hu.aut.meixner.dto.task.other.BlindMapResponse
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.task.other.BlindMapRepository
import hu.aut.meixner.service.file.MediaItemService
import org.springframework.stereotype.Service

@Service
class BlindMapService(
        private val repository: BlindMapRepository,
        private val mediaItemService: MediaItemService
) {
    fun createBlindMap(request: BlindMapRequest): BlindMapResponse? {
        return repository.save(request.toEntity(owner = currentUser, image = mediaItemService.mediaItemRequestToEntity(request.image)
                ?: return null)).toDomainModel()
    }

    fun updateBlindMap(id: Long, request: BlindMapRequest): BlindMapResponse? {
        val blindMapEntity = repository.findById(id).toNullable ?: return null
        if (!blindMapEntity.ownerIsTheCurrentUser) return null
        return repository.save(
                request.toEntity(owner = currentUser, image = mediaItemService.mediaItemRequestToEntity(request.image)
                        ?: return null).apply { this.id = id }
        ).toDomainModel()
    }
}