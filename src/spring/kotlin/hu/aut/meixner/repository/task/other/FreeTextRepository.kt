package hu.aut.meixner.repository.task.other

import hu.aut.meixner.entity.task.other.FreeTextEntity
import org.springframework.data.repository.CrudRepository

interface FreeTextRepository : CrudRepository<FreeTextEntity, Long>