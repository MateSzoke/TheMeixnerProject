package hu.aut.meixner.service.task.easy

import hu.aut.meixner.dto.task.easy.GroupingRequest
import hu.aut.meixner.dto.task.easy.GroupingResponse
import hu.aut.meixner.entity.task.easy.GroupElementEntity
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.task.easy.GroupingRepository
import hu.aut.meixner.service.file.MediaItemService
import org.springframework.stereotype.Service

@Service
class GroupingService(
        private val groupingRepository: GroupingRepository,
        private val mediaItemService: MediaItemService
) {

    fun createGrouping(groupingRequest: GroupingRequest): GroupingResponse? {
        return groupingRepository.save(groupingRequest.toEntity(owner = currentUser, groups = groupingRequest.groups.map { grouping ->
            GroupElementEntity(
                    name = grouping.name,
                    elements = grouping.elements.mapNotNull {
                        mediaItemService.mediaItemRequestToEntity(it) ?: return@mapNotNull null
                    }.toMutableList()
            )
        })).toDomainModel()
    }

    fun updateGrouping(id: Long, groupingRequest: GroupingRequest): GroupingResponse? {
        val result = groupingRepository.findById(id).toNullable ?: return null
        if (!result.ownerIsTheCurrentUser) return null
        return groupingRepository.save(groupingRequest.toEntity(owner = currentUser, groups = groupingRequest.groups.map { grouping ->
            GroupElementEntity(
                    name = grouping.name,
                    elements = grouping.elements.mapNotNull {
                        mediaItemService.mediaItemRequestToEntity(it) ?: return@mapNotNull null
                    }.toMutableList()
            )
        }).apply { this.id = id }
        ).toDomainModel()
    }

}