package hu.aut.meixner.dto.easytask

import hu.aut.meixner.dto.Task

data class SentenceCreation(
        val sentences: List<Sentence>
) : Task()