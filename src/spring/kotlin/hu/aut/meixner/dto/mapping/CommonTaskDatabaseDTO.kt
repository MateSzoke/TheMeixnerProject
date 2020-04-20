package hu.aut.meixner.dto.mapping

import hu.aut.meixner.domain.task.MediaItemEntity
import hu.aut.meixner.domain.task.MediaItemType.*
import hu.aut.meixner.dto.task.common.MediaItemRequest
import hu.aut.meixner.dto.task.common.MediaItemResponse
import hu.aut.meixner.extensions.Log
import hu.aut.meixner.service.file.FileService.Companion.DOWNLOAD_FILE_PATH
import org.springframework.web.servlet.support.ServletUriComponentsBuilder


fun MediaItemRequest.toEntity(): MediaItemEntity {
    Log.i(file?.originalFilename ?: "original filename is null")
    return MediaItemEntity(
            type = type,
            content = content,
            file = if (type != TEXT) file?.bytes else null,
            fileExtension = if (type != TEXT) file?.originalFilename?.split(".")?.get(1) else null
    )
}

fun MediaItemEntity.toDomainModel(): MediaItemResponse {
    return MediaItemResponse(
            id = id,
            type = type,
            content = when (type) {
                TEXT -> content
                IMAGE -> file.toContent(id)
                VIDEO -> file.toContent(id)
                SOUND -> file.toContent(id)
            }
    )
}

private fun ByteArray?.toContent(mediaItemId: Long): String {
    if (this == null) return ""
    return ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/files/$DOWNLOAD_FILE_PATH")
            .path(mediaItemId.toString())
            .toUriString()
}