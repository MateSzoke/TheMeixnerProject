package hu.aut.meixner.dto.task.other

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.dto.task.common.TaskResponse
import hu.aut.meixner.dto.task.common.TaskTypeEnum
import java.time.OffsetDateTime

class FreeTextResponse(
        val freeTextElements: MutableList<FreeTextElement>,
        override val id: Long,
        override val type: TaskTypeEnum = TaskTypeEnum.FreeText,
        override val title: String,
        override val owner: String,
        override val subject: SubjectEnum,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : TaskResponse()