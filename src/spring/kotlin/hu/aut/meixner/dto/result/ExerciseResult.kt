package hu.aut.meixner.dto.result

import java.time.OffsetDateTime

class ExerciseResult(
        val taskResults: List<TaskResultResponse>,
        val exerciseName: String,
        val averageAttempts: Double,
        val lastModified: OffsetDateTime
)