package hu.aut.meixner.domain.easytask

import javax.persistence.*

@Entity
data class PairEntity(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        @ElementCollection(targetClass = String::class)
        val pair: MutableList<String> = mutableListOf()
)