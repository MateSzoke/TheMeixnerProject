package hu.aut.meixner.dto.task.student.complex

import hu.aut.meixner.dto.task.complex.SentenceCompletionItem

class SentenceCompletionAndSortingTaskRequest(
        val attempts: Int,
        val sentences: List<SentenceCompletionItem>
)