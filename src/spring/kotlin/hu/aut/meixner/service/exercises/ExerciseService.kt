package hu.aut.meixner.service.exercises

import hu.aut.meixner.dto.exercises.ExerciseRequest
import hu.aut.meixner.dto.exercises.ExercisesResponse
import hu.aut.meixner.dto.mapping.toDomainModel
import hu.aut.meixner.dto.mapping.toEntity
import hu.aut.meixner.dto.task.common.TaskResponse
import hu.aut.meixner.entity.exercises.ExercisesEntity
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.repository.exercise.ExerciseRepository
import hu.aut.meixner.repository.task.TaskRepository
import hu.aut.meixner.service.task.TaskService
import org.springframework.stereotype.Service

@Service
class ExerciseService(
        private val exerciseRepository: ExerciseRepository,
        private val taskService: TaskService,
        private val taskRepository: TaskRepository
) {

    fun createExercises(exerciseRequest: ExerciseRequest): ExercisesResponse {
        return exerciseRepository.save(exerciseRequest.toEntity()).toDomainModel(emptyList())
    }

    fun getExercisesById(exercisesId: Long): ExercisesResponse? {
        val exercise = exerciseRepository.findById(exercisesId).toNullable ?: return null
        return exercise.toDomainModel(tasks = getTaskEntitiesFromExercises(exercise) ?: return null)
    }

    fun addTaskToExercises(exercisesId: Long, taskId: Long): ExercisesResponse? {
        return setTaskFromExercises(exercisesId = exercisesId, taskId = taskId, isAdd = true)
    }

    fun removeTaskFromExercises(exercisesId: Long, taskId: Long): ExercisesResponse? {
        return setTaskFromExercises(exercisesId = exercisesId, taskId = taskId, isAdd = false)
    }

    fun updateExercises(exercisesId: Long, exerciseRequest: ExerciseRequest): ExercisesResponse? {
        val exercise = exerciseRepository.findById(exercisesId).toNullable ?: return null
        return exerciseRepository.save(exercise.copy(
                id = exercisesId,
                name = exerciseRequest.name,
                comment = exerciseRequest.comment
        )).toDomainModel(tasks = getTaskEntitiesFromExercises(exercise) ?: return null)
    }

    private fun getTaskEntitiesFromExercises(exercise: ExercisesEntity): List<TaskResponse>? {
        return exercise.tasks.map { taskEntity ->
            taskService.getTaskById(taskEntity.id) ?: return null
        }
    }

    private fun setTaskFromExercises(exercisesId: Long, taskId: Long, isAdd: Boolean): ExercisesResponse? {
        val task = taskRepository.findById(taskId).toNullable ?: return null
        val exercise = exerciseRepository.findById(exercisesId).toNullable ?: return null
        if (isAdd) exercise.tasks += task else exercise.tasks -= task
        return exerciseRepository.save(exercise)
                .toDomainModel(tasks = getTaskEntitiesFromExercises(exercise) ?: return null)
    }
}