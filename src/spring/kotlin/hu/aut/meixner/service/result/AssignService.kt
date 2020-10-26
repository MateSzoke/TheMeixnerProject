package hu.aut.meixner.service.result

import hu.aut.meixner.dto.result.AssignedExercise
import hu.aut.meixner.dto.result.StartedExercise
import hu.aut.meixner.dto.result.TaskResultResponse
import hu.aut.meixner.dto.task.student.easy.AssignTask
import hu.aut.meixner.entity.result.SolvedExercise
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.mapping.toAssignedExercise
import hu.aut.meixner.repository.result.SolvedExerciseRepository
import hu.aut.meixner.service.auth.UserService
import hu.aut.meixner.service.exercises.ExerciseService
import hu.aut.meixner.service.task.TaskService
import org.springframework.stereotype.Service
import java.time.OffsetDateTime

@Service
class AssignService(
        private val exerciseService: ExerciseService,
        private val resultService: ResultService,
        private val userService: UserService,
        private val solvedExerciseRepository: SolvedExerciseRepository,
        private val taskService: TaskService
) {

    fun getTasksByExerciseId(exerciseId: Long): List<AssignTask>? {
        val exercise = exerciseService.getExercisesById(exerciseId) ?: return null
        return exercise.tasks.mapNotNull { it.toAssignTask() ?: return@mapNotNull null }
    }

    fun getStudentTasksById(taskId: Long): AssignTask? {
        val task = taskService.getTaskById(taskId) ?: return null
        return task.toAssignTask()
    }

    fun startExercise(exerciseId: Long): StartedExercise? {
        val exercise = exerciseService.getExercisesById(exerciseId) ?: return null
        val solvedExercise = solvedExerciseRepository.save(SolvedExercise(
                exerciseId = exerciseId,
                userId = userService.getUser()?.id ?: return null)
        )
        val taskIds = exercise.tasks.map { it.id }
        val nextTaskId = if (taskIds.isNotEmpty()) taskIds.random() else null
        return StartedExercise(
                id = solvedExercise.id,
                exerciseId = exerciseId,
                taskIds = taskIds,
                solvedTaskIds = emptyList(),
                taskResult = null,
                nextTask = exercise.tasks.first { it.id == nextTaskId }.toAssignTask()
        )
    }

    fun getStartedExercise(startedExerciseId: Long, solvedTaskId: Long, taskResult: TaskResultResponse): StartedExercise? {
        val solvedExercise = solvedExerciseRepository.findById(startedExerciseId).toNullable ?: return null
        val exercise = exerciseService.getExercisesById(solvedExercise.exerciseId) ?: return null
        with(solvedExercise) {
            solvedTaskIds += solvedTaskId
            attempts += taskResult.attempts
            taskResultIds += taskResult.id
            lastModified = OffsetDateTime.now()
        }
        solvedExerciseRepository.save(solvedExercise)
        val taskIds = exercise.tasks.map { it.id }
        val nextTaskIds = taskIds - solvedExercise.solvedTaskIds
        val nextTaskId = if (nextTaskIds.isNotEmpty()) nextTaskIds.random() else null
        return StartedExercise(
                id = solvedExercise.id,
                exerciseId = exercise.id,
                taskIds = taskIds,
                solvedTaskIds = solvedExercise.solvedTaskIds,
                taskResult = taskResult,
                nextTask = exercise.tasks.firstOrNull { it.id == nextTaskId }?.toAssignTask()
        )
    }

    fun getMyExercises(): List<AssignedExercise>? {
        val student = resultService.getStudentByUserId(userService.getUser()?.id ?: return null) ?: return null
        return student.exercises.map { it.toAssignedExercise() }
    }

}