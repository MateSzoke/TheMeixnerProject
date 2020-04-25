package hu.aut.meixner.dto.task.complex

import hu.aut.meixner.dto.task.easy.Sentence

class SentenceListRequest(
        val groupTitle: String,
        val sentences: List<Sentence>
)