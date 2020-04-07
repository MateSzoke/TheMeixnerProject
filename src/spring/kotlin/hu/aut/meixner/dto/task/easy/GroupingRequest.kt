package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.task.TaskRequest
import hu.aut.meixner.dto.task.TypeEnum

open class GroupingRequest(
        override val type: TypeEnum = TypeEnum.Grouping,
        override val title: String,
        override val difficulty: Int,
        val groups: List<Group>
): TaskRequest()