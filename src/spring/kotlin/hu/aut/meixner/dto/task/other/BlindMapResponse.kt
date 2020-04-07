package hu.aut.meixner.dto.task.other

import hu.aut.meixner.dto.task.TaskResponse
import hu.aut.meixner.dto.task.TypeEnum
import java.time.OffsetDateTime

class BlindMapResponse(
        val imageResource: String,
        val tags: MutableList<BlindMapTag>,
        override val id: Long,
        override val type: TypeEnum = TypeEnum.BlindMap,
        override val title: String,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : TaskResponse()