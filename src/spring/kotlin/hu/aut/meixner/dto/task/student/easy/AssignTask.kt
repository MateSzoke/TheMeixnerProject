package hu.aut.meixner.dto.task.student.easy

import hu.aut.meixner.dto.task.common.TaskTypeEnum

abstract class AssignTask {
    abstract val taskId: Long
    abstract val title: String
    abstract val type: TaskTypeEnum
}