package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.dto.task.common.TaskRequest

open class GroupingRequest(
        override val title: String,
        override val difficulty: Int,
        override val subject: SubjectEnum,
        override val recommendedMinClass: Int,
        override val recommendedMaxClass: Int,
        val groups: List<GroupRequest>
): TaskRequest()