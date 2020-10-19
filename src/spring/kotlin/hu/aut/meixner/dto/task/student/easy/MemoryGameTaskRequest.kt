package hu.aut.meixner.dto.task.student.easy

import hu.aut.meixner.dto.task.easy.PairElementRequest

class MemoryGameTaskRequest(
        val attempts: Int,
        val pairs: List<PairElementRequest>
)