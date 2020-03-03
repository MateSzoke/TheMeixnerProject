package hu.aut.meixner.dto

data class SentenceCompletion(
        val sentence: Sentence,
        val options: MutableList<String>
) : Task()