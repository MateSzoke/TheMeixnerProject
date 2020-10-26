package hu.aut.meixner.mapping

import hu.aut.meixner.dto.exercises.ExerciseRequest
import hu.aut.meixner.dto.exercises.ExercisesResponse
import hu.aut.meixner.dto.result.AssignedExercise
import hu.aut.meixner.dto.task.common.TaskResponse
import hu.aut.meixner.entity.exercises.ExercisesEntity
import kotlin.math.roundToInt

fun ExerciseRequest.toEntity(owner: String): ExercisesEntity {
    return ExercisesEntity(
            name = name,
            subject = subject,
            classLevel = classLevel,
            comment = comment,
            owner = owner
    )
}

fun ExercisesEntity.toDomainModel(tasks: List<TaskResponse>): ExercisesResponse {
    return ExercisesResponse(
            id = id,
            name = name,
            subject = subject,
            classLevel = classLevel,
            comment = comment,
            tasks = tasks,
            owner = owner,
            averageDifficulty = if (tasks.isNotEmpty()) tasks.map { it.difficulty }.average().roundToInt() else 0,
            lastModified = tasks.map { it.lastModified }.max() ?: createdAt
    )
}

fun ExercisesResponse.toAssignedExercise(): AssignedExercise {
    return AssignedExercise(
            id = id,
            name = name,
            subject = subject
    )
}