package hu.aut.meixner.service.task.other

import hu.aut.meixner.dto.task.other.OddOneOutRequest
import hu.aut.meixner.dto.task.other.OddOneOutResponse
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.task.other.OddOneOutRepository
import hu.aut.meixner.service.file.MediaItemService
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class OddOneOutService(
        private val repository: OddOneOutRepository,
        private val mediaItemService: MediaItemService
) {
    fun createOddOneOut(request: OddOneOutRequest): OddOneOutResponse? {
        if (request.correctAnswerIndex !in 0..request.options.lastIndex) return null
        return repository.save(request.toEntity(owner = currentUser, options = request.options.mapNotNull {
            mediaItemService.mediaItemRequestToEntity(it) ?: return@mapNotNull null
        })).toDomainModel()
    }

    fun updateOddOneOut(id: Long, request: OddOneOutRequest): OddOneOutResponse? {
        val oddOneOutEntity = repository.findByIdOrNull(id) ?: return null
        if (!oddOneOutEntity.ownerIsTheCurrentUser) return null
        if (request.correctAnswerIndex !in 0..request.options.lastIndex) return null
        return repository.save(
                request.toEntity(owner = currentUser, options = request.options.mapNotNull {
                    mediaItemService.mediaItemRequestToEntity(it) ?: return@mapNotNull null
                }).apply { this.id = id }
        ).toDomainModel()
    }
}