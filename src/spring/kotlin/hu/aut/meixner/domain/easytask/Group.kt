package hu.aut.meixner.domain.easytask

import javax.persistence.*

@Entity
data class Group(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        val name: String = "",
        @ElementCollection(targetClass = String::class)
        val elements: List<String> = emptyList()
)