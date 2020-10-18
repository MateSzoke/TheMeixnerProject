package hu.aut.meixner.dto.task.student.easy

import hu.aut.meixner.dto.task.common.MediaItemResponse
import hu.aut.meixner.dto.task.common.TaskTypeEnum

class PairingTask(
        override val taskId: Long,
        override val title: String,
        override val type: TaskTypeEnum = TaskTypeEnum.Pairing,
        val elements: List<MediaItemResponse>
) : AssignTask()