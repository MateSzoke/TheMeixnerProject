package hu.aut.meixner.dto.task.common

import hu.aut.meixner.domain.task.MediaItemType

class MediaItemRequest(
        val type: MediaItemType,
        val content: String,
        val file: ByteArray? = null
)