package hu.aut.meixner.dto.task.common

import hu.aut.meixner.entity.task.MediaItemType

class MediaItemResponse(
        val id: Long,
        val type: MediaItemType,
        val content: String
)