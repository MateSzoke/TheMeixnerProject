package hu.aut.meixner.entity.task.complex

import javax.persistence.*

@Entity
data class SentenceCompletionItemEntity(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        @ElementCollection(targetClass = String::class)
        val sentence: MutableList<String> = mutableListOf(),
        @ElementCollection(targetClass = String::class)
        val options: MutableList<String> = mutableListOf()
)