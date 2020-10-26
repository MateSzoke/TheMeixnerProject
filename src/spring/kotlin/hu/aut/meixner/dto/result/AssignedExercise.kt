package hu.aut.meixner.dto.result

import hu.aut.meixner.dto.SubjectEnum

class AssignedExercise(
        val id: Long,
        val name: String,
        val subject: SubjectEnum
)