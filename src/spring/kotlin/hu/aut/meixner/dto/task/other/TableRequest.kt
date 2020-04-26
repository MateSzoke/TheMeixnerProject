package hu.aut.meixner.dto.task.other

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.dto.task.common.MediaItemRequest
import hu.aut.meixner.dto.task.common.TaskRequest

class TableRequest(
        val table: List<List<MediaItemRequest>>,
        override val title: String,
        override val difficulty: Int,
        override val subject: SubjectEnum,
        override val recommendedMinClass: Int,
        override val recommendedMaxClass: Int
) : TaskRequest()