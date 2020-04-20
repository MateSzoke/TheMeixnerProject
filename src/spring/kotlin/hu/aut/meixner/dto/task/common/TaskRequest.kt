package hu.aut.meixner.dto.task.common

abstract class TaskRequest {
    abstract val title: String
    abstract val difficulty: Int
}