package hu.aut.meixner.service.task.complex

import hu.aut.meixner.dto.task.complex.GroupingAndSortingRequest
import hu.aut.meixner.dto.task.complex.GroupingAndSortingResponse
import hu.aut.meixner.entity.task.easy.GroupElementEntity
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.mapping.containsRequests
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.task.complex.GroupingAndSortingRepository
import hu.aut.meixner.service.file.MediaItemService
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class GroupingAndSortingService(
        private val repository: GroupingAndSortingRepository,
        private val mediaItemService: MediaItemService
) {
    fun createGroupingAndSorting(groupingAndSortingRequest: GroupingAndSortingRequest): GroupingAndSortingResponse? {
        return repository.save(groupingAndSortingRequest.toEntity(owner = currentUser, groups = groupingAndSortingRequest.groups.map { grouping ->
            GroupElementEntity(
                    name = grouping.name,
                    elements = grouping.elements.mapNotNull {
                        mediaItemService.mediaItemRequestToEntity(it) ?: return@mapNotNull null
                    }.toMutableList()
            )
        })).toDomainModel()
    }

    fun updateGroupingAndSorting(id: Long, groupingAndSortingRequest: GroupingAndSortingRequest): GroupingAndSortingResponse? {
        val result = repository.findByIdOrNull(id) ?: return null
        if (!result.ownerIsTheCurrentUser) return null
        return repository.save(
                groupingAndSortingRequest.toEntity(owner = currentUser, groups = groupingAndSortingRequest.groups.map { grouping ->
                    GroupElementEntity(
                            id = result.groups.find { it.elements.containsRequests(grouping.elements) }?.id ?: 0,
                            name = grouping.name,
                            elements = grouping.elements.mapNotNull {
                                mediaItemService.mediaItemRequestToEntity(it) ?: return@mapNotNull null
                            }.toMutableList()
                    )
                }).apply { this.id = id }
        ).toDomainModel()
    }
}