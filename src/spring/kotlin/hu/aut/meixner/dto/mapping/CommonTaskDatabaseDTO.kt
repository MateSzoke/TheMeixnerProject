package hu.aut.meixner.dto.mapping

import hu.aut.meixner.domain.task.MediaItemEntity
import hu.aut.meixner.domain.task.MediaItemType
import hu.aut.meixner.dto.task.common.MediaItemRequest
import hu.aut.meixner.dto.task.common.MediaItemResponse
import org.springframework.util.StringUtils
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.servlet.support.ServletUriComponentsBuilder


fun MediaItemRequest.toEntity(): MediaItemEntity {
    return MediaItemEntity(
            type = type,
            content = when (type) {
                MediaItemType.TEXT -> content
                MediaItemType.IMAGE -> file.toContent()
                MediaItemType.VIDEO -> file.toContent()
                MediaItemType.SOUND -> file.toContent()
            },
            file = file?.bytes
    )
}

fun MediaItemEntity.toDomainModel(): MediaItemResponse {
    return MediaItemResponse(
            id = id,
            type = type,
            content = content
    )
}

private fun MultipartFile?.toContent(): String {
    if (this == null) return ""
    val fileName = StringUtils.cleanPath(originalFilename ?: "")
    return ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/files/download/")
            .path(fileName).path("/db")
            .toUriString()
}