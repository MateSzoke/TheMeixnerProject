package hu.aut.meixner.dto.task.common

import hu.aut.meixner.dto.SubjectEnum

abstract class TaskRequest {
    abstract val title: String
    abstract val difficulty: Int
    abstract val subject: SubjectEnum
}