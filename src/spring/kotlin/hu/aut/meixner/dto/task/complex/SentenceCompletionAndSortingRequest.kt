package hu.aut.meixner.dto.task.complex

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.dto.task.common.TaskRequest

class SentenceCompletionAndSortingRequest(
        val sentences: List<SentenceCompletionItem>,
        override val title: String,
        override val difficulty: Int,
        override val subject: SubjectEnum,
        override val recommendedMinClass: Int,
        override val recommendedMaxClass: Int
) : TaskRequest()