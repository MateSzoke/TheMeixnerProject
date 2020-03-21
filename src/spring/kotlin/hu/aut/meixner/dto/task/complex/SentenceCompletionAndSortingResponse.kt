package hu.aut.meixner.dto.task.complex

import hu.aut.meixner.dto.task.easy.SortingResponse
import java.time.OffsetDateTime

class SentenceCompletionAndSortingResponse(
        override val id: Long,
        override val title: String,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : SortingResponse(
        elements = mutableListOf(),
        id = id,
        lastModified = lastModified,
        title = title,
        difficulty = difficulty
)