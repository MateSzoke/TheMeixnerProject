package hu.aut.meixner.dto.task

import java.time.OffsetDateTime

abstract class TaskRequest {
    abstract val type: TypeEnum
    abstract val title: String
    abstract val difficulty: Int
}