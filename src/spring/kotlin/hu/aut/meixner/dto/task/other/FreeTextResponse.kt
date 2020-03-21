package hu.aut.meixner.dto.task.other

import hu.aut.meixner.dto.task.TaskResponse
import java.time.OffsetDateTime

class FreeTextResponse(
        val freeTextElements: MutableList<FreeTextElement>,
        override val id: Long,
        override val type: String = "FreeText",
        override val title: String,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : TaskResponse()