package hu.aut.meixner.dto.task.complex

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.dto.task.common.TaskResponse
import hu.aut.meixner.dto.task.common.TaskTypeEnum
import hu.aut.meixner.dto.task.easy.Sentence
import java.time.OffsetDateTime

class SentenceCreationAndSortingResponse(
        val sentences: List<Sentence>,
        override val id: Long,
        override val type: TaskTypeEnum = TaskTypeEnum.SentenceCreationAndSorting,
        override val title: String,
        override val owner: String,
        override val subject: SubjectEnum,
        override val difficulty: Int,
        override val recommendedMinClass: Int,
        override val recommendedMaxClass: Int,
        override val lastModified: OffsetDateTime
) : TaskResponse()