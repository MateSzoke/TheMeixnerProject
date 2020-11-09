package hu.aut.meixner.dto.task.student.other

import hu.aut.meixner.dto.task.other.BlindMapTag

class BlindMapTaskRequest(
        val attempts: Int,
        val tags: MutableList<BlindMapTag>,
)