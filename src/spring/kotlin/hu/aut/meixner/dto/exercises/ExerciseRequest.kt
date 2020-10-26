package hu.aut.meixner.dto.exercises

import hu.aut.meixner.dto.SubjectEnum

class ExerciseRequest(
        val name: String,
        val subject: SubjectEnum,
        val classLevel: Int,
        val comment: String
)