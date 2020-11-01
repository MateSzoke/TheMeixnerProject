package hu.aut.meixner.dto.task.student.complex

import hu.aut.meixner.dto.task.easy.Sentence

class SentenceCreationAndSortingTaskRequest(
        val attempts: Int,
        val sentences: List<Sentence>
)