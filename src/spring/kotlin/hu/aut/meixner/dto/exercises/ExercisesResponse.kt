package hu.aut.meixner.dto.exercises

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.dto.task.common.TaskResponse
import java.time.OffsetDateTime

class ExercisesResponse(
        val id: Long,
        val name: String,
        val subject: SubjectEnum,
        val classLevel: Int,
        val comment: String,
        val owner: String,
        val tasks: List<TaskResponse>,
        val lastModified: OffsetDateTime?,
        val averageDifficulty: Int
)