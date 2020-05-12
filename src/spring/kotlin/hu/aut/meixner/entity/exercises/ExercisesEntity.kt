package hu.aut.meixner.entity.exercises

import javax.persistence.*

@Entity
data class ExercisesEntity(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        val name: String = "",
        val comment: String = "",
        val owner: String = "",
        @ElementCollection(targetClass = Long::class)
        val taskIds: MutableList<Long> = mutableListOf()
)