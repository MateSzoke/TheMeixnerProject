package hu.aut.meixner.dto.task.complex

import hu.aut.meixner.dto.task.easy.Sentence

class SentenceCompletionList(
        val groupTitle: String,
        val sentences: List<Sentence>
)