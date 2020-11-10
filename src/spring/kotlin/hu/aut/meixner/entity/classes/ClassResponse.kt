package hu.aut.meixner.entity.classes

import hu.aut.meixner.dto.exercises.ExercisesResponse
import hu.aut.meixner.dto.result.StudentResponse

data class ClassResponse(
        val id: Long,
        val name: String,
        val classLevel: Int,
        val students: List<StudentResponse>,
        val exercises: List<ExercisesResponse>
)