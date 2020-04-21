package hu.aut.meixner.dto.task.complex

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.dto.task.common.TaskTypeEnum
import hu.aut.meixner.dto.task.easy.GroupingResponse
import java.time.OffsetDateTime

class SortingAndGroupingResponse(
        override val id: Long,
        override val type: TaskTypeEnum = TaskTypeEnum.SortingAndGrouping,
        override val title: String,
        override val owner: String,
        override val subject: SubjectEnum,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : GroupingResponse(
        groups = mutableListOf(),
        id = id,
        type = type,
        lastModified = lastModified,
        title = title,
        owner = owner,
        subject = subject,
        difficulty = difficulty
)