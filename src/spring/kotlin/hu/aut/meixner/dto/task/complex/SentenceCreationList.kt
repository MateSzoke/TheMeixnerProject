package hu.aut.meixner.dto.task.complex

import hu.aut.meixner.dto.task.easy.Sentence

data class SentenceCreationList(
        val groupTitle: String,
        val sentences: List<Sentence>
)