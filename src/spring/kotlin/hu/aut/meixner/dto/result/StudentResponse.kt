package hu.aut.meixner.dto.result

import hu.aut.meixner.dto.auth.UserResponse
import hu.aut.meixner.dto.exercises.ExercisesResponse

class StudentResponse(
        val id: Long,
        val user: UserResponse,
        val exercises: List<ExercisesResponse>,
        val classLevel: Int
)