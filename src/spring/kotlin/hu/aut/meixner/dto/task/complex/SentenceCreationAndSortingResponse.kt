package hu.aut.meixner.dto.task.complex

import hu.aut.meixner.dto.task.easy.SortingResponse
import java.time.OffsetDateTime

class SentenceCreationAndSortingResponse(
        override val id: Long,
        override val type: String = "SentenceCreationAndSorting",
        override val title: String,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : SortingResponse(
        elements = mutableListOf(),
        id = id,
        type = type,
        lastModified = lastModified,
        title = title,
        difficulty = difficulty
)