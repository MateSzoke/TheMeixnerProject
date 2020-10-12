package hu.aut.meixner.mapping

import hu.aut.meixner.dto.auth.UserResponse
import hu.aut.meixner.dto.exercises.ExercisesResponse
import hu.aut.meixner.dto.result.StudentResponse
import hu.aut.meixner.dto.result.TaskResultResponse
import hu.aut.meixner.dto.task.common.TaskResponse
import hu.aut.meixner.entity.auth.UserEntity
import hu.aut.meixner.entity.result.StudentEntity
import hu.aut.meixner.entity.result.TaskResultEntity

fun StudentEntity.toDomainModel(user: UserEntity, exercises: List<ExercisesResponse>): StudentResponse {
    return StudentResponse(
            id = id,
            user = user.toDomainModel(),
            exercises = exercises,
            classLevel = classLevel
    )
}

fun TaskResultEntity.toDomainModel(taskResult: TaskResponse, user: UserResponse): TaskResultResponse {
    return TaskResultResponse(
            id = id,
            taskResult = taskResult,
            resultPercentage = resultPercentage,
            user = user
    )
}