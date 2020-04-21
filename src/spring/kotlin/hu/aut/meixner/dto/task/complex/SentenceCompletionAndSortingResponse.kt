package hu.aut.meixner.dto.task.complex

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.dto.task.common.TaskTypeEnum
import hu.aut.meixner.dto.task.easy.SortingResponse
import java.time.OffsetDateTime

class SentenceCompletionAndSortingResponse(
        override val id: Long,
        override val type: TaskTypeEnum = TaskTypeEnum.SentenceCompletionAndSorting,
        override val title: String,
        override val owner: String,
        override val difficulty: Int,
        override val subject: SubjectEnum,
        override val lastModified: OffsetDateTime
) : SortingResponse(
        elements = mutableListOf(),
        id = id,
        type = type,
        lastModified = lastModified,
        title = title,
        owner = owner,
        subject = subject,
        difficulty = difficulty
)