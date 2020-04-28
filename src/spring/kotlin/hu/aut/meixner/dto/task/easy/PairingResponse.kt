package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.dto.task.common.TaskResponse
import hu.aut.meixner.dto.task.common.TaskTypeEnum
import java.time.OffsetDateTime

class PairingResponse(
        val pairs: List<PairElementResponse>,
        override val id: Long,
        override val type: TaskTypeEnum = TaskTypeEnum.Pairing,
        override val title: String,
        override val owner: String,
        override val subject: SubjectEnum,
        override val recommendedMinClass: Int,
        override val recommendedMaxClass: Int,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : TaskResponse()