package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.task.TaskResponse
import hu.aut.meixner.dto.task.TaskTypeEnum
import java.time.OffsetDateTime

class SentenceCompletionResponse(
        val sentence: String,
        val options: List<String>,
        override val id: Long,
        override val type: TaskTypeEnum = TaskTypeEnum.SentenceCompletion,
        override val title: String,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : TaskResponse()