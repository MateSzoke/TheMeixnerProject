package hu.aut.meixner.service.exercises

import hu.aut.meixner.dto.exercises.ExerciseRequest
import hu.aut.meixner.dto.exercises.ExercisesResponse
import hu.aut.meixner.dto.task.common.TaskResponse
import hu.aut.meixner.entity.exercises.ExercisesEntity
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.exercise.ExerciseRepository
import hu.aut.meixner.service.task.TaskService
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class ExerciseService(
        private val exerciseRepository: ExerciseRepository,
        private val taskService: TaskService
) {

    fun createExercises(exerciseRequest: ExerciseRequest): ExercisesResponse {
        return exerciseRepository.save(exerciseRequest.toEntity(owner = currentUser)).toDomainModel(emptyList())
    }

    fun getMyExercises(): List<ExercisesResponse> {
        return exerciseRepository.findAll().filter { it.owner == currentUser }.map { exercise ->
            exercise.toDomainModel(tasks = getTaskEntitiesFromExercises(exercise))
        }
    }

    fun getExercisesById(exercisesId: Long): ExercisesResponse? {
        val exercise = exerciseRepository.findByIdOrNull(exercisesId) ?: return null
        return exercise.toDomainModel(tasks = getTaskEntitiesFromExercises(exercise))
    }

    fun addTaskToExercises(exercisesId: Long, taskId: Long): ExercisesResponse? {
        return setTaskFromExercises(exercisesId = exercisesId, taskId = taskId, isAdd = true)
    }

    fun removeTaskFromExercises(exercisesId: Long, taskId: Long): ExercisesResponse? {
        return setTaskFromExercises(exercisesId = exercisesId, taskId = taskId, isAdd = false)
    }

    fun deleteExercises(exercisesId: Long) {
        exerciseRepository.deleteById(exercisesId)
    }

    fun updateExercises(exercisesId: Long, exerciseRequest: ExerciseRequest): ExercisesResponse? {
        val exercise = exerciseRepository.findByIdOrNull(exercisesId) ?: return null
        return exerciseRepository.save(exercise.copy(
                id = exercisesId,
                name = exerciseRequest.name,
                comment = exerciseRequest.comment
        )).toDomainModel(tasks = getTaskEntitiesFromExercises(exercise))
    }

    private fun getTaskEntitiesFromExercises(exercise: ExercisesEntity): List<TaskResponse> {
        return exercise.taskIds.mapNotNull { taskId ->
            taskService.getTaskById(taskId) ?: return@mapNotNull null
        }
    }

    private fun setTaskFromExercises(exercisesId: Long, taskId: Long, isAdd: Boolean): ExercisesResponse? {
        val task = taskService.getTaskById(taskId) ?: return null
        val exercise = exerciseRepository.findByIdOrNull(exercisesId) ?: return null
        if (isAdd) exercise.taskIds += task.id else exercise.taskIds -= task.id
        return exerciseRepository.save(exercise)
                .toDomainModel(tasks = getTaskEntitiesFromExercises(exercise))
    }

}