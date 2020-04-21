package hu.aut.meixner.service.task.easy

import hu.aut.meixner.domain.task.easytask.GroupElementEntity
import hu.aut.meixner.dto.mapping.toDomainModel
import hu.aut.meixner.dto.mapping.toEntity
import hu.aut.meixner.dto.task.easy.GroupingRequest
import hu.aut.meixner.dto.task.easy.GroupingResponse
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.repository.task.easytask.GroupingRepository
import hu.aut.meixner.service.file.FileService
import org.springframework.stereotype.Service
import java.time.OffsetDateTime

@Service
class GroupingService(
        private val groupingRepository: GroupingRepository,
        private val fileService: FileService
) {

    fun createGrouping(groupingRequest: GroupingRequest): GroupingResponse? {
        return groupingRepository.save(groupingRequest.toEntity(owner = currentUser, groups = groupingRequest.groups.map { grouping ->
            GroupElementEntity(
                    name = grouping.name,
                    elements = grouping.elements.map {
                        fileService.mediaItemRequestToEntity(it) ?: return null
                    }.toMutableList()
            )
        })).toDomainModel()
    }

    fun updateGrouping(id: Long, groupingRequest: GroupingRequest): GroupingResponse? {
        val grouping = groupingRepository.findById(id).toNullable ?: return null
        if (!grouping.ownerIsTheCurrentUser) return null
        return groupingRepository.save(
                groupingRequest.run {
                    grouping.copy(
                            title = title,
                            groups = groups.map { group ->
                                GroupElementEntity(
                                        name = group.name,
                                        elements = group.elements.map { element ->
                                            fileService.mediaItemRequestToEntity(element) ?: return null
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