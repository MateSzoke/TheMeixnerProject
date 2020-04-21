package hu.aut.meixner.dto.task.other

import hu.aut.meixner.dto.task.common.TaskResponse
import hu.aut.meixner.dto.task.common.TaskTypeEnum
import java.time.OffsetDateTime

class BlindMapResponse(
        val imageResource: String,
        val tags: MutableList<BlindMapTag>,
        override val id: Long,
        override val type: TaskTypeEnum = TaskTypeEnum.BlindMap,
        override val title: String,
        override val owner: String,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : TaskResponse()