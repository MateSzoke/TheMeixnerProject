package hu.aut.meixner.service.exercise

import hu.aut.meixner.dto.exercises.ExerciseRequest
import hu.aut.meixner.dto.exercises.ExercisesResponse
import hu.aut.meixner.dto.mapping.toDomainModel
import hu.aut.meixner.dto.mapping.toEntity
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
        val tasks = exercise.tasks.map { taskEntity ->
            taskService.getTaskById(taskEntity.id) ?: return null
        }
        return exercise.toDomainModel(tasks)
    }

    fun addTaskToExercises(exercisesId: Long, taskId: Long): ExercisesResponse? {
        return setTaskFromExercises(exercisesId = exercisesId, taskId = taskId, isAdd = true)
    }

    fun removeTaskFromExercises(exercisesId: Long, taskId: Long): ExercisesResponse? {
        return setTaskFromExercises(exercisesId = exercisesId, taskId = taskId, isAdd = false)
    }

    private fun setTaskFromExercises(exercisesId: Long, taskId: Long, isAdd: Boolean): ExercisesResponse? {
        val task = taskRepository.findById(taskId).toNullable ?: return null
        val exercise = exerciseRepository.findById(exercisesId).toNullable ?: return null
        if (isAdd) exercise.tasks += task else exercise.tasks -= task
        exerciseRepository.save(exercise)
        return getExercisesById(exercisesId)
    }
}