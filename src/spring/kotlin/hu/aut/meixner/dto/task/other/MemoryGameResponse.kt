package hu.aut.meixner.dto.task.other

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.dto.task.easy.PairingResponse
import java.time.OffsetDateTime

class MemoryGameResponse(
        override val id: Long,
        override val title: String,
        override val owner: String,
        override val subject: SubjectEnum,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : PairingResponse(
        title = title,
        pairs = emptyList(),
        id = id,
        owner = owner,
        subject = subject,
        lastModified = lastModified,
        difficulty = difficulty
)
