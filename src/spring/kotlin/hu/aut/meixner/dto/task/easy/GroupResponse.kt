package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.task.common.MediaItemResponse

class GroupResponse(
        val name: String,
        val elements: List<MediaItemResponse>
)