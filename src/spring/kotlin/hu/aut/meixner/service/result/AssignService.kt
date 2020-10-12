package hu.aut.meixner.service.result

import hu.aut.meixner.dto.result.AssignedExercise
import hu.aut.meixner.dto.task.student.easy.AssignTask
import hu.aut.meixner.service.auth.UserService
import hu.aut.meixner.service.exercises.ExerciseService
import org.springframework.stereotype.Service

@Service
class AssignService(
        private val exerciseService: ExerciseService,
        private val resultService: ResultService,
        private val userService: UserService
) {

    fun getTasksByExerciseId(exerciseId: Long): List<AssignTask>? {
        val exercise = exerciseService.getExercisesById(exerciseId) ?: return null
        return exercise.tasks.map { it.toAssignClass() ?: return null }
    }

    fun getMyExercises(): List<AssignedExercise>? {
        val student = resultService.getStudentByUserId(userService.getUser()?.id ?: return null) ?: return null
        return student.exercises.map { exercise ->
            AssignedExercise(
                    id = exercise.id,
                    name = exercise.name,
                    taskIds = exercise.tasks.map { it.id }
            )
        }
    }

}