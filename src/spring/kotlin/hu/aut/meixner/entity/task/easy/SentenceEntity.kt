package hu.aut.meixner.entity.task.easy

import javax.persistence.*

@Entity
data class SentenceEntity(
        @Id @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long = 0,
        val sentenceTitle: String = "",
        @ElementCollection(targetClass = String::class)
        val parts: MutableList<String> = mutableListOf()
)