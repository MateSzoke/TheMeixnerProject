package hu.aut.meixner.dto.task.common

import hu.aut.meixner.dto.SubjectEnum
import java.time.OffsetDateTime

abstract class TaskResponse {
    abstract val id: Long
    abstract val type: TaskTypeEnum
    abstract val title: String
    abstract val owner: String
    abstract val subject: SubjectEnum
    abstract val recommendedMinClass: Int
    abstract val recommendedMaxClass: Int
    abstract val difficulty: Int
    abstract val lastModified: OffsetDateTime
}