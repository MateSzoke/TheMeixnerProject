package hu.aut.meixner.dto.task.complex

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.dto.task.common.TaskResponse
import hu.aut.meixner.dto.task.common.TaskTypeEnum
import hu.aut.meixner.dto.task.easy.GroupResponse
import java.time.OffsetDateTime

class GroupingAndSortingResponse(
        val groups: List<GroupResponse>,
        override val id: Long,
        override val type: TaskTypeEnum = TaskTypeEnum.GroupingAndSorting,
        override val title: String,
        override val owner: String,
        override val subject: SubjectEnum,
        override val recommendedMinClass: Int,
        override val recommendedMaxClass: Int,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : TaskResponse()
