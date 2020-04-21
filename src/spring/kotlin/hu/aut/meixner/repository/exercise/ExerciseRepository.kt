package hu.aut.meixner.repository.exercise

import hu.aut.meixner.domain.exercises.ExercisesEntity
import org.springframework.data.repository.CrudRepository

interface ExerciseRepository : CrudRepository<ExercisesEntity, Long>