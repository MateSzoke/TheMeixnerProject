package hu.aut.meixner.dto.task.other

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.dto.task.common.TaskResponse
import hu.aut.meixner.dto.task.common.TaskTypeEnum
import java.time.OffsetDateTime

class OddOneOutResponse(
        val elements: MutableList<OddOneOutElement>,
        override val id: Long,
        override val type: TaskTypeEnum = TaskTypeEnum.OddOneOut,
        override val title: String,
        override val owner: String,
        override val subject: SubjectEnum,
        override val difficulty: Int,
        override val lastModified: OffsetDateTime
) : TaskResponse()