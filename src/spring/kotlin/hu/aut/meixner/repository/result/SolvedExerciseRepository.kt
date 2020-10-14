package hu.aut.meixner.repository.result

import hu.aut.meixner.entity.result.SolvedExercise
import org.springframework.data.repository.CrudRepository

interface SolvedExerciseRepository : CrudRepository<SolvedExercise, Long>