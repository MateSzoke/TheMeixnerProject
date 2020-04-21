package hu.aut.meixner.dto.mapping

import hu.aut.meixner.dto.exercises.ExerciseRequest
import hu.aut.meixner.dto.exercises.ExercisesResponse
import hu.aut.meixner.dto.task.common.TaskResponse
import hu.aut.meixner.entity.exercises.ExercisesEntity
import kotlin.math.roundToInt

fun ExerciseRequest.toEntity(): ExercisesEntity {
    return ExercisesEntity(
            name = name,
            comment = comment
    )
}

fun ExercisesEntity.toDomainModel(tasks: List<TaskResponse>): ExercisesResponse {
    return ExercisesResponse(
            id = id,
            name = name,
            comment = comment,
            tasks = tasks,
            averageDifficulty = if (tasks.isNotEmpty()) tasks.map { it.difficulty }.average().roundToInt() else 0,
            lastModified = tasks.map { it.lastModified }.max()
    )
}