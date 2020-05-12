package hu.aut.meixner.entity.exercises

import java.time.OffsetDateTime
import javax.persistence.*

@Entity
data class ExercisesEntity(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        val name: String = "",
        val comment: String = "",
        val owner: String = "",
        val createdAt: OffsetDateTime = OffsetDateTime.now(),
        @ElementCollection(targetClass = Long::class)
        val taskIds: MutableList<Long> = mutableListOf()
)