package hu.aut.meixner.dto.result

class AssignedExercise(
        val id: Long,
        val name: String,
        val taskIds: List<Long>
)