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

    fun getSortingById(id: Long): SortingResponse? {
        return sortingRepository.findById(id).toNullable?.toDTOModel() ?: return null
    }

    fun updateSorting(id: Long, sortingRequest: SortingRequest): SortingResponse? {
        val sentenceCompletion = sortingRepository.findById(id).toNullable ?: return null
        return sortingRepository.save(
                sortingRequest.run {
                    sentenceCompletion.copy(
                            title = title,
                            elements = elements,
                            lastModified = OffsetDateTime.now()
                    )
                }
        ).toDTOModel()
    }

    fun deleteSorting(id: Long) {
        val deletedSentenceCompletion = sortingRepository.findById(id).toNullable ?: return
        sortingRepository.delete(deletedSentenceCompletion)
    }

}