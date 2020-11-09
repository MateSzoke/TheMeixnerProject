package hu.aut.meixner.dto.task.student.other

import hu.aut.meixner.dto.task.common.MediaItemResponse
import hu.aut.meixner.dto.task.common.TaskTypeEnum
import hu.aut.meixner.dto.task.other.BlindMapTag
import hu.aut.meixner.dto.task.student.AssignTask

class BlindMapTask(
        override val taskId: Long,
        override val title: String,
        override val type: TaskTypeEnum = TaskTypeEnum.BlindMap,
        val image: MediaItemResponse,
        val tags: List<BlindMapTag>,
) : AssignTask()