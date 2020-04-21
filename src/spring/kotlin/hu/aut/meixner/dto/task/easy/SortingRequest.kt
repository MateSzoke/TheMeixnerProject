package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.task.common.MediaItemRequest
import hu.aut.meixner.dto.task.common.TaskRequest

class SortingRequest(
        override val title: String,
        override val difficulty: Int,
        val elements: List<MediaItemRequest>
) : TaskRequest()
