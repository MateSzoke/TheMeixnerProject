package hu.aut.meixner.dto.task.other

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.dto.task.common.TaskRequest
import hu.aut.meixner.entity.task.other.TimelineType
import java.time.OffsetDateTime

class TimelineRequest(
        val timelineType: TimelineType,
        val minimumDate: OffsetDateTime?,
        val maximumDate: OffsetDateTime?,
        val minimumInt: Int?,
        val maximumInt: Int?,
        val minimumDouble: Double?,
        val maximumDouble: Double?,
        val timelineTags: List<TimelineTag>,
        override val title: String,
        override val difficulty: Int,
        override val subject: SubjectEnum,
        override val recommendedMinClass: Int,
        override val recommendedMaxClass: Int
) : TaskRequest()