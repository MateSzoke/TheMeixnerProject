package hu.aut.meixner.dto.task.student.easy

import hu.aut.meixner.dto.task.common.TaskTypeEnum

class SentenceCompletionTask(
        override val taskId: Long,
        override val title: String,
        override val type: TaskTypeEnum = TaskTypeEnum.SentenceCompletion,
        val sentence: String,
        val options: List<String>
) : AssignTask()