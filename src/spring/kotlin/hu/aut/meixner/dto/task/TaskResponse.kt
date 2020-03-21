package hu.aut.meixner.dto.task

import java.time.OffsetDateTime

abstract class TaskResponse {
    abstract val id: Long
    abstract val type: String
    abstract val title: String
    abstract val difficulty: Int
    abstract val lastModified: OffsetDateTime
}