package hu.aut.meixner.dto.task.student.easy

import hu.aut.meixner.dto.task.common.TaskTypeEnum

class SentenceCreationTask(
        override val taskId: Long,
        override val type: TaskTypeEnum = TaskTypeEnum.SentenceCreation,
        val titles: List<String>,
        val parts: List<String>
) : AssignTask()