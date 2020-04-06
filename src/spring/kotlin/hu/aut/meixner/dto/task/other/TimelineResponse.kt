package hu.aut.meixner.dto.task.other

import hu.aut.meixner.dto.task.TaskResponse
import hu.aut.meixner.dto.task.TypeEnum
import java.time.OffsetDateTime

class TimelineResponse(
        val timelineType: TimelineType,
        val minimum: String,
        val maximum: String,
        val timelineTags: MutableList<TimelineTag>,
        override val id: Long,
        override val type: TypeEnum = TypeEnum.TimeLine,
        override val title: String,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : TaskResponse()