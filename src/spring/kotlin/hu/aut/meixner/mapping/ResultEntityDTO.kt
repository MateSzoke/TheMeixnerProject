package hu.aut.meixner.mapping

import hu.aut.meixner.dto.exercises.ExercisesResponse
import hu.aut.meixner.dto.result.StudentResponse
import hu.aut.meixner.entity.auth.UserEntity
import hu.aut.meixner.entity.result.StudentEntity

fun StudentEntity.toDomainModel(user: UserEntity, exercises: List<ExercisesResponse>): StudentResponse {
    return StudentResponse(
            id = id,
            user = user.toDomainModel(),
            exercises = exercises,
            classLevel = classLevel
    )
}