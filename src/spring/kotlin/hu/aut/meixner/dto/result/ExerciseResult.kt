package hu.aut.meixner.dto.result

import java.time.OffsetDateTime

class ExerciseResult(
        val taskResults: List<TaskResultResponse>,
        val exerciseName: String,
        val resultPercentage: Double,
        val lastModified: OffsetDateTime
)