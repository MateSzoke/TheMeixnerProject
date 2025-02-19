package hu.aut.meixner.dto.task.student.complex

import hu.aut.meixner.dto.task.common.TaskTypeEnum
import hu.aut.meixner.dto.task.student.AssignTask

class SentenceCompletionAndGroupingTask(
        override val taskId: Long,
        override val title: String,
        override val type: TaskTypeEnum = TaskTypeEnum.SentenceCompletionAndGrouping,
        val groupTitles: List<String>,
        val sentences: List<List<String>>,
        val options: List<String>
) : AssignTask()