package hu.aut.meixner.mapping

import hu.aut.meixner.dto.task.common.MediaItemRequest
import hu.aut.meixner.dto.task.common.MediaItemResponse
import hu.aut.meixner.entity.task.MediaItemEntity
import hu.aut.meixner.entity.task.MediaItemType.FILE
import hu.aut.meixner.entity.task.MediaItemType.TEXT
import hu.aut.meixner.service.file.MediaItemService.Companion.DOWNLOAD_FILE_PATH
import org.springframework.web.servlet.support.ServletUriComponentsBuilder


fun MediaItemEntity.toDomainModel(): MediaItemResponse {
    return MediaItemResponse(
            id = id,
            type = type,
            content = when (type) {
                TEXT -> content
                FILE -> file.toContent(id)
            }
    )
}

fun MediaItemRequest.toDomainModel(): MediaItemResponse {
    return MediaItemResponse(
            id = mediaItemId ?: 0,
            content = content ?: "",
            type = if (mediaItemId != null) FILE else TEXT
    )
}

private fun ByteArray?.toContent(mediaItemId: Long): String {
    if (this == null) return ""
    return ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/files/$DOWNLOAD_FILE_PATH")
            .path(mediaItemId.toString())
            .toUriString()
}