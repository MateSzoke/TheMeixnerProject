package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.task.common.MediaItemRequest

class GroupRequest(
        val name: String,
        val elements: List<MediaItemRequest>
)