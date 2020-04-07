package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.task.TaskResponse
import hu.aut.meixner.dto.task.TaskTypeEnum
import java.time.OffsetDateTime

open class GroupingResponse(
        val groups: List<Group>,
        override val id: Long,
        override val type: TaskTypeEnum = TaskTypeEnum.Grouping,
        override val title: String,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : TaskResponse()