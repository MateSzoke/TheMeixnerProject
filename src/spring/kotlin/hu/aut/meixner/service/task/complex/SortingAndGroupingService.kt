package hu.aut.meixner.service.task.complex

import hu.aut.meixner.dto.task.complex.SortingAndGroupingRequest
import hu.aut.meixner.dto.task.complex.SortingAndGroupingResponse
import hu.aut.meixner.entity.task.easy.GroupElementEntity
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.mapping.containsRequests
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.task.complex.SortingAndGroupingRepository
import hu.aut.meixner.service.file.MediaItemService
import org.springframework.stereotype.Service

@Service
class SortingAndGroupingService(
        private val repository: SortingAndGroupingRepository,
        private val mediaItemService: MediaItemService
) {

    fun createSortingAndGrouping(request: SortingAndGroupingRequest): SortingAndGroupingResponse? {
        return repository.save(request.toEntity(owner = currentUser, groups = request.groups.map { grouping ->
            GroupElementEntity(
                    name = "",
                    elements = grouping.elements.mapNotNull {
                        mediaItemService.mediaItemRequestToEntity(it) ?: return@mapNotNull null
                    }.toMutableList()
            )
        })).toDomainModel()
    }

    fun updateSortingAndGrouping(id: Long, request: SortingAndGroupingRequest): SortingAndGroupingResponse? {
        val result = repository.findById(id).toNullable ?: return null
        if (!result.ownerIsTheCurrentUser) return null
        return repository.save(
                request.toEntity(owner = currentUser, groups = request.groups.map { grouping ->
                    GroupElementEntity(
                            id = result.groups.find { it.elements.containsRequests(grouping.elements) }?.id ?: 0,
                            name = "",
                            elements = grouping.elements.mapNotNull {
                                mediaItemService.mediaItemRequestToEntity(it) ?: return@mapNotNull null
                            }.toMutableList()
                    )
                }).apply { this.id = id }
        ).toDomainModel()
    }

}