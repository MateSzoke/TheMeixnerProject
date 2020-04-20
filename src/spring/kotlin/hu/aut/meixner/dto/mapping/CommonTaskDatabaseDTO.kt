package hu.aut.meixner.dto.mapping

import hu.aut.meixner.domain.task.MediaItemEntity
import hu.aut.meixner.dto.task.common.MediaItemRequest
import hu.aut.meixner.dto.task.common.MediaItemResponse

fun MediaItemRequest.toEntity(): MediaItemEntity {
    return MediaItemEntity(
            type = type,
            content = content,
            file = file
    )
}

fun MediaItemEntity.toDomainModel(): MediaItemResponse {
    return MediaItemResponse(
            id = id,
            type = type,
            content = content
    )
}