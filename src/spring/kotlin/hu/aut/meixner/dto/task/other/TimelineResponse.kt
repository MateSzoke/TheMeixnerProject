package hu.aut.meixner.dto.task.other

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.dto.task.common.TaskResponse
import hu.aut.meixner.dto.task.common.TaskTypeEnum
import hu.aut.meixner.entity.task.other.TimelineType
import java.time.OffsetDateTime

class TimelineResponse(
        val timelineType: TimelineType,
        val minimumDate: OffsetDateTime?,
        val maximumDate: OffsetDateTime?,
        val minimumInt: Int?,
        val maximumInt: Int?,
        val minimumDouble: Double?,
        val maximumDouble: Double?,
        val timelineTags: List<TimelineTag>,
        override val id: Long,
        override val type: TaskTypeEnum = TaskTypeEnum.TimeLine,
        override val title: String,
        override val owner: String,
        override val subject: SubjectEnum,
        override val recommendedMinClass: Int,
        override val recommendedMaxClass: Int,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : TaskResponse()