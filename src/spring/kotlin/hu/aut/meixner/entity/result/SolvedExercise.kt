package hu.aut.meixner.entity.result

import javax.persistence.*

@Entity
class SolvedExercise(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        val exerciseId: Long = 0,
        @ElementCollection(targetClass = Long::class)
        val solvedTaskIds: MutableList<Long> = mutableListOf(),
        @ElementCollection(targetClass = Double::class)
        val resultPercentages: MutableList<Double> = mutableListOf()
)