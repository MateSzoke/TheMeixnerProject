package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.task.TaskRequest
import hu.aut.meixner.dto.task.TypeEnum

class SortingRequest(
        override val type: TypeEnum = TypeEnum.Sorting,
        override val title: String,
        override val difficulty: Int,
        val elements: List<String>
) : TaskRequest()
