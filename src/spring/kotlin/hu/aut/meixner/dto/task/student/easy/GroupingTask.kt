package hu.aut.meixner.dto.task.student.easy

import hu.aut.meixner.dto.task.common.MediaItemResponse

class GroupingTask(
        val groups: List<String>,
        val elements: List<MediaItemResponse>
)