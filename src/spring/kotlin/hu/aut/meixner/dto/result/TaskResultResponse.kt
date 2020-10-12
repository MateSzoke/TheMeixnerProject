package hu.aut.meixner.dto.result

import hu.aut.meixner.dto.auth.UserResponse
import hu.aut.meixner.dto.task.common.TaskResponse

class TaskResultResponse(
        val id: Long,
        val taskResult: TaskResponse,
        val resultPercentage: Double,
        val user: UserResponse
)