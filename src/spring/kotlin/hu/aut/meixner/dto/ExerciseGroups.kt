package hu.aut.meixner.dto

import hu.aut.meixner.dto.task.TaskResponse

data class ExerciseGroups(
        val id: Int,
        val title: String,
        val difficultyRate: Double,
        val recommendedYear: Int,
        val subject: SubjectEnum,
        val tasks: List<TaskResponse>
)