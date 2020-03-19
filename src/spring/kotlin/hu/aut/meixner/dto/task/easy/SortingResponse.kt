package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.task.TaskResponse
import java.time.OffsetDateTime

open class SortingResponse<T>(
        val elements: MutableList<T>,
        override val id: Long,
        override val title: String,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : TaskResponse()