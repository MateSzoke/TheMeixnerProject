package hu.aut.meixner.dto.task.student.complex

import hu.aut.meixner.dto.task.complex.SentenceCompletionList

class SentenceCompletionAndGroupingTaskRequest(
        val attempts: Int,
        val sentenceGroups: List<SentenceCompletionList>
)