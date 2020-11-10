package hu.aut.meixner.mapping

import hu.aut.meixner.dto.classes.ClassRequest
import hu.aut.meixner.dto.exercises.ExercisesResponse
import hu.aut.meixner.dto.result.StudentResponse
import hu.aut.meixner.entity.classes.ClassEntity
import hu.aut.meixner.entity.classes.ClassResponse

fun ClassEntity.toDomainModel(students: List<StudentResponse>, exercises: List<ExercisesResponse>): ClassResponse {
    return ClassResponse(
            id = id,
            name = name,
            classLevel = classLevel,
            students = students,
            exercises = exercises
    )
}

fun ClassRequest.toEntity(): ClassEntity {
    return ClassEntity(
            name = name,
            classLevel = classLevel
    )
}