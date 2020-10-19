package hu.aut.meixner.dto.task.student.easy

class SentenceCompletionTaskRequest(
        val attempts: Int,
        val options: List<String>
)