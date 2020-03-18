package hu.aut.meixner.dto.easytask

import hu.aut.meixner.dto.Task

data class SentenceCompletion(
        val sentence: Sentence,
        val options: MutableList<String>
) : Task()