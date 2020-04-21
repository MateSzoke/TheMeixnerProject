package hu.aut.meixner.dto.mapping

import hu.aut.meixner.domain.task.MediaItemEntity
import hu.aut.meixner.domain.task.MediaItemType.FILE
import hu.aut.meixner.domain.task.MediaItemType.TEXT
import hu.aut.meixner.dto.task.common.MediaItemResponse
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

private fun ByteArray?.toContent(mediaItemId: Long): String {
    if (this == null) return ""
    return ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/files/$DOWNLOAD_FILE_PATH")
            .path(mediaItemId.toString())
            .toUriString()
}