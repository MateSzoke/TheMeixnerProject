package hu.aut.meixner.service.task.complex

import hu.aut.meixner.dto.task.complex.GroupingAndSortingRequest
import hu.aut.meixner.dto.task.complex.GroupingAndSortingResponse
import hu.aut.meixner.entity.task.easy.GroupElementEntity
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.task.complex.GroupingAndSortingRepository
import hu.aut.meixner.service.file.MediaItemService
import org.springframework.stereotype.Service
import java.time.OffsetDateTime

@Service
class GroupingAndSortingService(
        private val repository: GroupingAndSortingRepository,
        private val mediaItemService: MediaItemService
) {
    fun createGroupingAndSorting(groupingAndSortingRequest: GroupingAndSortingRequest): GroupingAndSortingResponse? {
        return repository.save(groupingAndSortingRequest.toEntity(owner = currentUser, groups = groupingAndSortingRequest.groups.map { grouping ->
            GroupElementEntity(
                    name = grouping.name,
                    elements = grouping.elements.map {
                        mediaItemService.mediaItemRequestToEntity(it) ?: return null
                    }.toMutableList()
            )
        })).toDomainModel()
    }

    fun updateGroupingAndSorting(id: Long, groupingAndSortingRequest: GroupingAndSortingRequest): GroupingAndSortingResponse? {
        val grouping = repository.findById(id).toNullable ?: return null
        if (!grouping.ownerIsTheCurrentUser) return null
        return repository.save(
                groupingAndSortingRequest.run {
                    grouping.copy(
                            title = title,
                            groups = groups.map { group ->
                                GroupElementEntity(
                                        name = group.name,
                                        elements = group.elements.map { element ->
                                            mediaItemService.mediaItemRequestToEntity(element) ?: return null
                                        }.toMutableList()
                                )
                            },
                            difficulty = difficulty,
                            lastModified = OffsetDateTime.now()
                    )
                }.apply { this.id = id }
        ).toDomainModel()
    }
}