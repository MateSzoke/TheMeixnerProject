package hu.aut.meixner.dto.task.student.easy

import hu.aut.meixner.dto.task.common.MediaItemResponse
import hu.aut.meixner.dto.task.common.TaskTypeEnum
import hu.aut.meixner.dto.task.student.AssignTask

class SortingTask(
        override val taskId: Long,
        override val title: String,
        override val type: TaskTypeEnum = TaskTypeEnum.Sorting,
        val elements: List<MediaItemResponse>
) : AssignTask()