package hu.aut.meixner.service.task.easy

import hu.aut.meixner.dto.task.easy.SortingRequest
import hu.aut.meixner.dto.task.easy.SortingResponse
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.task.easy.SortingRepository
import hu.aut.meixner.service.file.MediaItemService
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class SortingService(
        private val sortingRepository: SortingRepository,
        private val mediaItemService: MediaItemService
) {

    fun createSorting(sortingRequest: SortingRequest): SortingResponse? {
        return sortingRepository.save(sortingRequest.toEntity(owner = currentUser, elements = sortingRequest.elements.mapNotNull {
            mediaItemService.mediaItemRequestToEntity(it) ?: return@mapNotNull null
        })).toDomainModel()
    }

    fun updateSorting(id: Long, sortingRequest: SortingRequest): SortingResponse? {
        val sorting = sortingRepository.findByIdOrNull(id) ?: return null
        if (!sorting.ownerIsTheCurrentUser) return null
        return sortingRepository.save(
                sortingRequest.toEntity(owner = currentUser, elements = sortingRequest.elements.mapNotNull {
                    mediaItemService.mediaItemRequestToEntity(it) ?: return@mapNotNull null
                }).apply { this.id = id }
        ).toDomainModel()
    }

}