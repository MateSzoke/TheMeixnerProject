package hu.aut.meixner.dto.result

import hu.aut.meixner.dto.auth.UserResponse
import hu.aut.meixner.dto.task.common.TaskResponse
import java.time.OffsetDateTime

class TaskResultResponse(
        val id: Long,
        val taskResult: TaskResponse?,
        val currentResult: List<Boolean>,
        val attempts: Int,
        val user: UserResponse,
        val lastModified: OffsetDateTime
)