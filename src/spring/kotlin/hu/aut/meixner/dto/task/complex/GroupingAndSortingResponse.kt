package hu.aut.meixner.dto.task.complex

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.dto.task.common.TaskTypeEnum
import hu.aut.meixner.dto.task.easy.GroupResponse
import java.time.OffsetDateTime

class GroupingAndSortingResponse(
        val id: Long,
        val groups: List<GroupResponse>,
        val type: TaskTypeEnum = TaskTypeEnum.GroupingAndSorting,
        val title: String,
        val owner: String,
        val subject: SubjectEnum,
        val difficulty: Int,
        val recommendedMinClass: Int,
        val recommendedMaxClass: Int,
        val lastModified: OffsetDateTime
)
