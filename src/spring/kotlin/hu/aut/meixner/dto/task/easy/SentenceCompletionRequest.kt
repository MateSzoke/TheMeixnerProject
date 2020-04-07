package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.task.TaskRequest

class SentenceCompletionRequest(
        override val title: String,
        override val difficulty: Int,
        val sentence: String,
        val options: List<String>
): TaskRequest()