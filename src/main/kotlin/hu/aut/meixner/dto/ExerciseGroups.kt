package hu.aut.meixner.dto

data class ExerciseGroups(
        val id: Int,
        val title: String,
        val difficultyRate: Double,
        val recommendedYear: Int,
        val subject: SubjectEnum,
        val tasks: List<Task>
)