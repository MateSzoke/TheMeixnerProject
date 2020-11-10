package hu.aut.meixner.entity.classes

import javax.persistence.*

@Entity
data class ClassEntity(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        val name: String = "",
        val classLevel: Int = 0,
        @ElementCollection(targetClass = Long::class)
        val studentIds: MutableList<Long> = mutableListOf(),
        @ElementCollection(targetClass = Long::class)
        val exerciseIds: MutableList<Long> = mutableListOf()
)