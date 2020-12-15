package hu.aut.meixner.service.result

import hu.aut.meixner.dto.result.AssignedExercise
import hu.aut.meixner.dto.result.StartedExercise
import hu.aut.meixner.dto.result.TaskResultResponse
import hu.aut.meixner.dto.task.student.AssignTask
import hu.aut.meixner.entity.result.SolvedExercise
import hu.aut.meixner.mapping.toAssignedExercise
import hu.aut.meixner.repository.result.SolvedExerciseRepository
import hu.aut.meixner.service.auth.UserService
import hu.aut.meixner.service.exercises.ExerciseService
import hu.aut.meixner.service.task.TaskService
import org.springframework.data.repository.findByIdOrNull
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

    companion object {
        const val ASSIGN_RESULT_THRESHOLD = 2
    }

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
        val solvedExercise = solvedExerciseRepository.findByIdOrNull(startedExerciseId) ?: return null
        val exercise = exerciseService.getExercisesById(solvedExercise.exerciseId) ?: return null
        val success = taskResult.currentResult.all { it }
        with(solvedExercise) {
            if (success) {
                solvedTaskIds += solvedTaskId
                taskResultIds += taskResult.id
            }
            attempts += taskResult.attempts
            lastModified = OffsetDateTime.now()
        }
        solvedExerciseRepository.save(solvedExercise)
        val taskIds = exercise.tasks.map { it.id }
        val nextTaskId = getNextTaskId(
                nextTaskIds = taskIds - solvedExercise.solvedTaskIds,
                attempts = taskResult.attempts,
                currentDifficulty = taskResult.taskResult?.difficulty,
                success = success
        )
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

    private fun getNextTaskId(nextTaskIds: List<Long>, attempts: Int, currentDifficulty: Int?, success: Boolean): Long? {
        return if (nextTaskIds.isNotEmpty() && success && currentDifficulty != null) {
            val tasks = nextTaskIds.mapNotNull { taskService.getTaskById(it) }.sortedBy { it.difficulty }
            val currentResult = (currentDifficulty / 10.0) - attempts
            when {
                currentResult < -ASSIGN_RESULT_THRESHOLD -> tasks.firstOrNull()?.id
                currentResult > ASSIGN_RESULT_THRESHOLD -> tasks.lastOrNull()?.id
                else -> nextTaskIds.random()
            }
        } else null
    }

}