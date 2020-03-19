package hu.aut.meixner.dto.task.other

import hu.aut.meixner.dto.task.TaskResponse
import java.time.OffsetDateTime

class OddOneOutResponse(
        val elements: MutableList<OddOneOutElement>,
        override val id: Long,
        override val title: String,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : TaskResponse()