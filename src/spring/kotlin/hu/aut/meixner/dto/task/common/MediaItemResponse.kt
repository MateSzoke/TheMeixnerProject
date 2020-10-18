package hu.aut.meixner.dto.task.common

import hu.aut.meixner.entity.task.MediaItemType
import hu.aut.meixner.entity.task.MediaItemType.FILE
import hu.aut.meixner.entity.task.MediaItemType.TEXT

class MediaItemResponse(
        val id: Long,
        val type: MediaItemType,
        val content: String
) {

    override fun equals(other: Any?): Boolean {
        return when (other) {
            is MediaItemResponse -> {
                when (type) {
                    TEXT -> content == other.content
                    FILE -> id == other.id
                }
            }
            is MediaItemRequest -> {
                when (type) {
                    TEXT -> content == other.content
                    FILE -> id == other.mediaItemId
                }
            }
            else -> false
        }
    }

    override fun hashCode(): Int {
        return when (type) {
            TEXT -> content.hashCode()
            FILE -> id.hashCode()
        }
    }
}