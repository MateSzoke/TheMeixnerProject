package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.task.TaskResponse
import java.time.OffsetDateTime

class SentenceCompletionResponse(
        val sentence: String,
        val options: List<String>,
        override val id: Long,
        override val type: String = "SentenceCompletion",
        override val title: String,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : TaskResponse()