package hu.aut.meixner.dto.task.other

import hu.aut.meixner.dto.task.TaskResponse
import hu.aut.meixner.dto.task.TaskTypeEnum
import java.time.OffsetDateTime

class FreeTextResponse(
        val freeTextElements: MutableList<FreeTextElement>,
        override val id: Long,
        override val type: TaskTypeEnum = TaskTypeEnum.FreeText,
        override val title: String,
        override val owner: String,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : TaskResponse()