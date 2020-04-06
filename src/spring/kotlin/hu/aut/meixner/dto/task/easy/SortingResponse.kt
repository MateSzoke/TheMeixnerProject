package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.task.TaskResponse
import hu.aut.meixner.dto.task.TypeEnum
import java.time.OffsetDateTime

open class SortingResponse(
        val elements: List<String>,
        override val id: Long,
        override val type: TypeEnum = TypeEnum.Sorting,
        override val title: String,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : TaskResponse()