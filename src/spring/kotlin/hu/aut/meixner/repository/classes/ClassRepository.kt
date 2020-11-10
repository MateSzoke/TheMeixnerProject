package hu.aut.meixner.repository.classes

import hu.aut.meixner.entity.classes.ClassEntity
import org.springframework.data.repository.CrudRepository

interface ClassRepository : CrudRepository<ClassEntity, Long>