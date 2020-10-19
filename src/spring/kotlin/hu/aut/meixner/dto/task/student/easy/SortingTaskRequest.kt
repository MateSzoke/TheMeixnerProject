package hu.aut.meixner.dto.task.student.easy

import hu.aut.meixner.dto.task.common.MediaItemRequest

class SortingTaskRequest(
        val attempts: Int,
        val elements: List<MediaItemRequest>
)