package hu.aut.meixner.service.result

import hu.aut.meixner.dto.task.student.easy.AssignTask
import hu.aut.meixner.service.exercises.ExerciseService
import org.springframework.stereotype.Service

@Service
class AssignService(
        private val exerciseService: ExerciseService
) {

    fun getTasksByExerciseId(exerciseId: Long): List<AssignTask>? {
        val exercise = exerciseService.getExercisesById(exerciseId) ?: return null
        return exercise.tasks.map { it.toAssignClass() ?: return null }
    }

}