package hu.aut.meixner.dto.task.student.easy

import hu.aut.meixner.dto.task.common.MediaItemResponse
import hu.aut.meixner.dto.task.common.TaskTypeEnum

class TrueFalseTask(
        override val taskId: Long,
        override val title: String,
        override val type: TaskTypeEnum = TaskTypeEnum.TrueFalse,
        val elements: List<MediaItemResponse>
) : AssignTask()