package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.task.TaskRequest
import hu.aut.meixner.dto.task.TypeEnum

class SentenceCreationRequest(
        override val type: TypeEnum = TypeEnum.SentenceCreation,
        override val title: String,
        override val difficulty: Int,
        val sentences: List<Sentence>
): TaskRequest()