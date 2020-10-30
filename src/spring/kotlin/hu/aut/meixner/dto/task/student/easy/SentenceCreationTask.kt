package hu.aut.meixner.dto.task.student.easy

import hu.aut.meixner.dto.task.common.TaskTypeEnum
import hu.aut.meixner.dto.task.student.AssignTask

class SentenceCreationTask(
        override val taskId: Long,
        override val title: String,
        override val type: TaskTypeEnum = TaskTypeEnum.SentenceCreation,
        val sentenceTitles: List<String>,
        val parts: List<String>
) : AssignTask()