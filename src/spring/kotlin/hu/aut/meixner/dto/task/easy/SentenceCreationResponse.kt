package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.task.common.TaskResponse
import hu.aut.meixner.dto.task.common.TaskTypeEnum
import java.time.OffsetDateTime

class SentenceCreationResponse(
        val sentences: List<Sentence>,
        override val id: Long,
        override val type: TaskTypeEnum = TaskTypeEnum.SentenceCreation,
        override val title: String,
        override val owner: String,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : TaskResponse()