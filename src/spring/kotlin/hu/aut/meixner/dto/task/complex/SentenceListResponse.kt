package hu.aut.meixner.dto.task.complex

import hu.aut.meixner.dto.task.easy.Sentence

class SentenceListResponse(
        val id: Long,
        val groupTitle: String,
        val sentences: List<Sentence>
)