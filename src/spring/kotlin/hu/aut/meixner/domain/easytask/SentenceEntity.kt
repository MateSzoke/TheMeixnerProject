package hu.aut.meixner.domain.easytask

import javax.persistence.*

@Entity
data class SentenceEntity(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        val sentenceTitle: String = "",
        @ElementCollection(targetClass = String::class)
        val parts: List<String> = emptyList()
)