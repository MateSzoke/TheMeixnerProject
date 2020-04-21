package hu.aut.meixner.service.task.easy

import hu.aut.meixner.dto.mapping.toDomainModel
import hu.aut.meixner.dto.mapping.toEntity
import hu.aut.meixner.dto.task.easy.SortingRequest
import hu.aut.meixner.dto.task.easy.SortingResponse
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.repository.task.easytask.SortingRepository
import hu.aut.meixner.service.file.FileService
import org.springframework.stereotype.Service
import java.time.OffsetDateTime

@Service
class SortingService(
        private val sortingRepository: SortingRepository,
        private val fileService: FileService
) {

    fun createSorting(sortingRequest: SortingRequest): SortingResponse? {
        return sortingRepository.save(sortingRequest.toEntity(owner = currentUser, elements = sortingRequest.elements.map {
            fileService.mediaItemRequestToEntity(it) ?: return null
        })).toDomainModel()
    }

    fun updateSorting(id: Long, sortingRequest: SortingRequest): SortingResponse? {
        val sorting = sortingRepository.findById(id).toNullable ?: return null
        if (!sorting.ownerIsTheCurrentUser) return null
        return sortingRepository.save(
                sortingRequest.run {
                    sorting.copy(
                            title = title,
                            elements = elements.map {
                                fileService.mediaItemRequestToEntity(it) ?: return null
                            }.toMutableList(),
                            difficulty = difficulty,
                            lastModified = OffsetDateTime.now()
                    )
                }.apply { this.id = id }
        ).toDomainModel()
    }

}