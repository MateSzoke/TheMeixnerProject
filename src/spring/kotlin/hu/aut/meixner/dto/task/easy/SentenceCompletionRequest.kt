package hu.aut.meixner.dto.task.easy

class SentenceCompletionRequest(
        val title: String,
        val sentence: String,
        val options: List<String>
)