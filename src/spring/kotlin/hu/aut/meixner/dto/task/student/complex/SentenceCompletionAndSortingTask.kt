package hu.aut.meixner.dto.task.student.complex

import hu.aut.meixner.dto.task.common.TaskTypeEnum
import hu.aut.meixner.dto.task.student.AssignTask

class SentenceCompletionAndSortingTask(
        override val taskId: Long,
        override val title: String,
        override val type: TaskTypeEnum = TaskTypeEnum.SentenceCompletionAndSorting,
) : AssignTask()