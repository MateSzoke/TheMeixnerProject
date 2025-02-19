package hu.aut.meixner.entity.result

import java.time.OffsetDateTime
import javax.persistence.*

@Entity
class SolvedExercise(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        val userId: Long = 0,
        val exerciseId: Long = 0,
        @ElementCollection(targetClass = Long::class)
        val solvedTaskIds: MutableList<Long> = mutableListOf(),
        @ElementCollection(targetClass = Long::class)
        val taskResultIds: MutableList<Long> = mutableListOf(),
        @ElementCollection(targetClass = Int::class)
        val attempts: MutableList<Int> = mutableListOf(),
        var lastModified: OffsetDateTime = OffsetDateTime.now()
)