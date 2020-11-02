package hu.aut.meixner.dto.task.student.complex

import hu.aut.meixner.dto.task.common.TaskTypeEnum
import hu.aut.meixner.dto.task.student.AssignTask

class SentenceCreationAndGroupingTask(
        override val taskId: Long,
        override val title: String,
        override val type: TaskTypeEnum = TaskTypeEnum.SentenceCreationAndGrouping,
        val groupTitles: List<String>,
        val sentenceTitles: List<String>,
        val parts: List<String>
) : AssignTask()