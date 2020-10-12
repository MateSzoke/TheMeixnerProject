package hu.aut.meixner.dto.task.student.easy

import hu.aut.meixner.dto.task.common.MediaItemRequest

class TrueFalseTaskRequest(
        val trueItems: List<MediaItemRequest>,
        val falseItems: List<MediaItemRequest>
)