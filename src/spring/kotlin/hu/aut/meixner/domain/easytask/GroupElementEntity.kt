package hu.aut.meixner.domain.easytask

import javax.persistence.*

@Entity
data class GroupElementEntity(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        val name: String = "",
        @ElementCollection(targetClass = String::class)
        val elements: MutableList<String> = mutableListOf()
)