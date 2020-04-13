package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.task.TaskResponse
import hu.aut.meixner.dto.task.TaskTypeEnum
import java.time.OffsetDateTime

open class PairingResponse(
        val pairs: List<PairElement>,
        override val id: Long,
        override val type: TaskTypeEnum = TaskTypeEnum.Pairing,
        override val title: String,
        override val owner: String,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : TaskResponse()