package hu.aut.meixner.dto

class FreeTextElement(
        val imageResource: String,
        val answers: MutableList<String>,
        val correctAnswerIndex: Int
)