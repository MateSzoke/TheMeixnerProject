package hu.aut.meixner.dto.task.complex

import hu.aut.meixner.dto.task.easy.GroupingResponse
import java.time.OffsetDateTime

class SentenceCompletionAndGroupingResponse(
        override val id: Long,
        override val type: String = "SentenceCompletionAndGrouping",
        override val title: String,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : GroupingResponse(
        groups = mutableListOf(),
        id = id,
        type = type,
        lastModified = lastModified,
        title = title,
        difficulty = difficulty
)