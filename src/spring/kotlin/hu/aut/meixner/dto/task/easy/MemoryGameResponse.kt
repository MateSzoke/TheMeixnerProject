package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.dto.task.common.TaskResponse
import hu.aut.meixner.dto.task.common.TaskTypeEnum
import java.time.OffsetDateTime

class MemoryGameResponse(
        val pairs: List<PairElementResponse>,
        override val id: Long,
        override val title: String,
        override val owner: String,
        override val subject: SubjectEnum,
        override val difficulty: Int,
        override val recommendedMinClass: Int,
        override val recommendedMaxClass: Int,
        override val lastModified: OffsetDateTime,
        override val type: TaskTypeEnum = TaskTypeEnum.MemoryGame
) : TaskResponse()
