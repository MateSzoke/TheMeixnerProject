package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.dto.task.common.TaskRequest

class SentenceCreationRequest(
        override val title: String,
        override val difficulty: Int,
        override val subject: SubjectEnum,
        val sentences: List<Sentence>
): TaskRequest()