package hu.aut.meixner.dto.task.other

import java.time.OffsetDateTime

class TimelineTag(
        val name: String,
        val valueDate: OffsetDateTime?,
        val valueInt: Int?,
        val valueDouble: Double?,
        val tolerance: Double
)