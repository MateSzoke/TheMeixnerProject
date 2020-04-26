package hu.aut.meixner.service.task.complex

import hu.aut.meixner.dto.task.complex.SortingAndGroupingRequest
import hu.aut.meixner.dto.task.complex.SortingAndGroupingResponse
import hu.aut.meixner.entity.task.easy.GroupElementEntity
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.task.complex.SortingAndGroupingRepository
import hu.aut.meixner.service.file.MediaItemService
import org.springframework.stereotype.Service
import java.time.OffsetDateTime

@Service
class SortingAndGroupingService(
        private val repository: SortingAndGroupingRepository,
        private val mediaItemService: MediaItemService
) {

    fun createSortingAndGrouping(request: SortingAndGroupingRequest): SortingAndGroupingResponse? {
        return repository.save(request.toEntity(owner = currentUser, groups = request.groups.map { grouping ->
            GroupElementEntity(
                    name = "",
                    elements = grouping.elements.map {
                        mediaItemService.mediaItemRequestToEntity(it) ?: return null
                    }.toMutableList()
            )
        })).toDomainModel()
    }

    fun updateSortingAndGrouping(id: Long, request: SortingAndGroupingRequest): SortingAndGroupingResponse? {
        val grouping = repository.findById(id).toNullable ?: return null
        if (!grouping.ownerIsTheCurrentUser) return null
        return repository.save(
                request.run {
                    grouping.copy(
                            title = title,
                            groups = groups.map { group ->
                                GroupElementEntity(
                                        name = "",
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