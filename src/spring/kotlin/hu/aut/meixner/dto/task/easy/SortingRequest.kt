package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.task.TaskRequest

class SortingRequest(
        override val title: String,
        override val difficulty: Int,
        val elements: List<String>
) : TaskRequest()
