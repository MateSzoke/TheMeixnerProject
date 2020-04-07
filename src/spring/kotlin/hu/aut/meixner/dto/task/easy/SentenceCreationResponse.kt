package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.task.TaskResponse
import hu.aut.meixner.dto.task.TypeEnum
import java.time.OffsetDateTime

class SentenceCreationResponse(
        val sentences: List<Sentence>,
        override val id: Long,
        override val type: TypeEnum = TypeEnum.SentenceCreation,
        override val title: String,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : TaskResponse()