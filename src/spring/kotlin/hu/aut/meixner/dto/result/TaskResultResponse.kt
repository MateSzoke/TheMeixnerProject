package hu.aut.meixner.dto.result

import hu.aut.meixner.dto.task.common.TaskResponse

class TaskResultResponse(
        val id: Long,
        val taskResult: TaskResponse,
        val resultPercentage: Double
)