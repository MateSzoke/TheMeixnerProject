package hu.aut.meixner.dto.task.student.easy

import hu.aut.meixner.dto.task.easy.Sentence

class SentenceCreationTaskRequest(
        val attempts: Int,
        val sentences: List<Sentence>
)