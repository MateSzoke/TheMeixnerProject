package hu.aut.meixner.dto.mapping

import hu.aut.meixner.domain.task.MediaItemEntity
import hu.aut.meixner.domain.task.MediaItemType.*
import hu.aut.meixner.dto.task.common.MediaItemResponse
import hu.aut.meixner.service.file.FileService.Companion.DOWNLOAD_FILE_PATH
import org.springframework.web.servlet.support.ServletUriComponentsBuilder


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