package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.dto.task.common.TaskResponse
import hu.aut.meixner.dto.task.common.TaskTypeEnum
import java.time.OffsetDateTime

open class GroupingResponse(
        val groups: List<GroupResponse>,
        override val id: Long,
        override val type: TaskTypeEnum = TaskTypeEnum.Grouping,
        override val title: String,
        override val owner: String,
        override val subject: SubjectEnum,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : TaskResponse()