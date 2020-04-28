package hu.aut.meixner.service.task.easy

import hu.aut.meixner.dto.task.easy.TrueFalseRequest
import hu.aut.meixner.dto.task.easy.TrueFalseResponse
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.task.easy.TrueFalseRepository
import hu.aut.meixner.service.file.MediaItemService
import org.springframework.stereotype.Service

@Service
class TrueFalseService(
        private val trueFalseRepository: TrueFalseRepository,
        private val mediaItemService: MediaItemService
) {

    fun createTrueFalse(request: TrueFalseRequest): TrueFalseResponse? {
        return trueFalseRepository.save(request.toEntity(
                owner = currentUser,
                trueItems = request.trueItems.map {
                    mediaItemService.mediaItemRequestToEntity(it) ?: return null
                },
                falseItems = request.falseItems.map {
                    mediaItemService.mediaItemRequestToEntity(it) ?: return null
                }
        )).toDomainModel()
    }

    fun updateTrueFalse(id: Long, request: TrueFalseRequest): TrueFalseResponse? {
        val result = trueFalseRepository.findById(id).toNullable ?: return null
        if (!result.ownerIsTheCurrentUser) return null
        return trueFalseRepository.save(request.toEntity(
                owner = currentUser,
                trueItems = request.trueItems.map {
                    mediaItemService.mediaItemRequestToEntity(it) ?: return null
                },
                falseItems = request.falseItems.map {
                    mediaItemService.mediaItemRequestToEntity(it) ?: return null
                }
        )).apply { this.id = id }.toDomainModel()
    }

}