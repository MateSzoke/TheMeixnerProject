package hu.aut.meixner.service.task.easy

import hu.aut.meixner.dto.task.easy.SortingRequest
import hu.aut.meixner.dto.task.easy.SortingResponse
import hu.aut.meixner.extensions.toDBModel
import hu.aut.meixner.extensions.toDTOModel
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.repository.task.easytask.SortingRepository
import org.springframework.stereotype.Service
import java.time.OffsetDateTime

@Service
class SortingService(
        private val sortingRepository: SortingRepository
) {

    fun createSorting(sortingRequest: SortingRequest): SortingResponse {
        return sortingRepository.save(sortingRequest.toDBModel()).toDTOModel()
    }

    fun updateSorting(id: Long, sortingRequest: SortingRequest): SortingResponse? {
        val sorting = sortingRepository.findById(id).toNullable ?: return null
        return sortingRepository.save(
                sortingRequest.run {
                    sorting.copy(
                            title = title,
                            elements = elements,
                            lastModified = OffsetDateTime.now()
                    )
                }.apply { this.id = id }
        ).toDTOModel()
    }

}