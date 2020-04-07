package hu.aut.meixner.dto.task

abstract class TaskRequest {
    abstract val title: String
    abstract val difficulty: Int
}