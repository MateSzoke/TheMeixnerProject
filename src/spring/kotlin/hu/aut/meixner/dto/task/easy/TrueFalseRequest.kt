package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.dto.task.common.MediaItemRequest
import hu.aut.meixner.dto.task.common.TaskRequest

class TrueFalseRequest(
        val trueItems: List<MediaItemRequest>,
        val falseItems: List<MediaItemRequest>,
        override val title: String,
        override val difficulty: Int,
        override val subject: SubjectEnum,
        override val recommendedMinClass: Int,
        override val recommendedMaxClass: Int
) : TaskRequest()