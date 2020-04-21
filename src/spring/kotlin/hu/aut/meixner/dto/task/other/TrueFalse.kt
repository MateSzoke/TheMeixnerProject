package hu.aut.meixner.dto.task.other

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.dto.task.easy.GroupResponse
import hu.aut.meixner.dto.task.easy.GroupingResponse
import java.time.OffsetDateTime

data class TrueFalse(
        val value: Boolean,
        override val id: Long,
        override val title: String,
        override val owner: String,
        override val subject: SubjectEnum,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : GroupingResponse(
        listOf(
                GroupResponse(name = if (value) "true" else "false", elements = mutableListOf()),
                GroupResponse(name = if (value) "false" else "true", elements = mutableListOf())
        ),
        id = id,
        title = title,
        owner = owner,
        subject = subject,
        lastModified = lastModified,
        difficulty = difficulty
)