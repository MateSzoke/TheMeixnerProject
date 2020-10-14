package hu.aut.meixner.dto.result

import hu.aut.meixner.dto.task.student.easy.AssignTask

class StartedExercise(
        val id: Long,
        val exerciseId: Long,
        val taskIds: List<Long>,
        val solvedTaskIds: List<Long>,
        val taskResult: TaskResultResponse?,
        val nextTask: AssignTask?
)