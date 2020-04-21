package hu.aut.meixner.repository.exercise

import hu.aut.meixner.entity.exercises.ExercisesEntity
import org.springframework.data.repository.CrudRepository

interface ExerciseRepository : CrudRepository<ExercisesEntity, Long>