package hu.aut.meixner.service.file

import hu.aut.meixner.domain.task.MediaItemEntity
import hu.aut.meixner.domain.task.MediaItemType
import hu.aut.meixner.dto.mapping.toDomainModel
import hu.aut.meixner.dto.mapping.toEntity
import hu.aut.meixner.dto.task.common.MediaItemRequest
import hu.aut.meixner.dto.task.common.MediaItemResponse
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.repository.task.MediaItemRepository
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile

@Service
class FileService(
        private val mediaItemRepository: MediaItemRepository
) {
    companion object {
        const val DOWNLOAD_FILE_PATH = "/download/"
    }

    fun uploadFile(file: MultipartFile): MediaItemResponse {
        val request = MediaItemRequest(
                content = "",
                type = MediaItemType.IMAGE,
                file = file
        )
        return mediaItemRepository.save(request.toEntity()).toDomainModel()
    }

    fun getFileById(id: Long): MediaItemResponse? {
        return mediaItemRepository.findById(id).toNullable?.toDomainModel()
    }

    fun getMediaItemEntity(id: Long): MediaItemEntity? {
        return mediaItemRepository.findById(id).toNullable
    }
}