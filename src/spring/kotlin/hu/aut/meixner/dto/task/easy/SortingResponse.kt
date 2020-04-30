package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.dto.task.common.MediaItemResponse
import hu.aut.meixner.dto.task.common.TaskResponse
import hu.aut.meixner.dto.task.common.TaskTypeEnum
import java.time.OffsetDateTime

class SortingResponse(
        val elements: List<MediaItemResponse>,
        override val id: Long,
        override val type: TaskTypeEnum = TaskTypeEnum.Sorting,
        override val title: String,
        override val owner: String,
        override val subject: SubjectEnum,
        override val recommendedMinClass: Int,
        override val recommendedMaxClass: Int,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : TaskResponse()