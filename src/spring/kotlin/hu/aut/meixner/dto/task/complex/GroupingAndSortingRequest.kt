package hu.aut.meixner.dto.task.complex

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.dto.task.common.TaskRequest
import hu.aut.meixner.dto.task.easy.GroupRequest

class GroupingAndSortingRequest(
        override val title: String,
        override val difficulty: Int,
        override val subject: SubjectEnum,
        override val recommendedMinClass: Int,
        override val recommendedMaxClass: Int,
        val groups: List<GroupRequest>
) : TaskRequest()
