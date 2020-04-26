package hu.aut.meixner.mapping

import hu.aut.meixner.dto.task.other.BlindMapRequest
import hu.aut.meixner.dto.task.other.BlindMapResponse
import hu.aut.meixner.dto.task.other.BlindMapTag
import hu.aut.meixner.entity.task.MediaItemEntity
import hu.aut.meixner.entity.task.other.BlindMapEntity
import hu.aut.meixner.entity.task.other.BlindMapTagEntity

//region BlindMap
fun BlindMapRequest.toEntity(owner: String, image: MediaItemEntity): BlindMapEntity {
    return BlindMapEntity(
            image = image,
            tags = tags.map { it.toEntity() }.toMutableList(),
            title = title,
            difficulty = difficulty,
            owner = owner,
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass,
            lastModified = java.time.OffsetDateTime.now()
    )
}

fun BlindMapEntity.toDomainModel(): BlindMapResponse {
    return BlindMapResponse(
            id = id,
            image = image.toDomainModel(),
            tags = tags.map { it.toDomainModel() },
            lastModified = lastModified,
            difficulty = difficulty,
            title = title,
            owner = owner,
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass
    )
}

fun BlindMapTag.toEntity(): BlindMapTagEntity {
    return BlindMapTagEntity(
            text = text,
            x = x,
            y = y
    )
}

fun BlindMapTagEntity.toDomainModel(): BlindMapTag {
    return BlindMapTag(
            text = text,
            x = x,
            y = y
    )
}
//endregion