package hu.aut.meixner.dto.result

class ExerciseResult(
        val taskResults: List<TaskResultResponse>,
        val exerciseName: String,
        val resultPercentage: Double
)