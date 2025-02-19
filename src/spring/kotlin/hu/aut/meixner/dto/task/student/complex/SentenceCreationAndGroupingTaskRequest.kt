package hu.aut.meixner.dto.task.student.complex

import hu.aut.meixner.dto.task.complex.SentenceCreationList

data class SentenceCreationAndGroupingTaskRequest(
        val attempts: Int,
        val sentenceGroups: List<SentenceCreationList>
)