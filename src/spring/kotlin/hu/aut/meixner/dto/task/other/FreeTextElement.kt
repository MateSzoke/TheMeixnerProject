package hu.aut.meixner.dto.task.other

class FreeTextElement(
        val imageResource: String,
        val answers: MutableList<String>,
        val correctAnswerIndex: Int
)