package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.task.common.TaskRequest

open class GroupingRequest(
        override val title: String,
        override val difficulty: Int,
        val groups: List<GroupRequest>
): TaskRequest()