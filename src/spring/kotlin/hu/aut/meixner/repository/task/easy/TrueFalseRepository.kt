package hu.aut.meixner.repository.task.easy

import hu.aut.meixner.entity.task.easy.TrueFalseEntity
import org.springframework.data.repository.CrudRepository

interface TrueFalseRepository : CrudRepository<TrueFalseEntity, Long>