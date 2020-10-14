package hu.aut.meixner.dto.task.student.easy

import hu.aut.meixner.dto.task.common.MediaItemResponse
import hu.aut.meixner.dto.task.common.TaskTypeEnum

class GroupingTask(
        override val taskId: Long,
        override val title: String,
        override val type: TaskTypeEnum = TaskTypeEnum.Grouping,
        val groups: List<String>,
        val elements: List<MediaItemResponse>,
) : AssignTask()