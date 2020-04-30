package hu.aut.meixner.repository.task.easy

import hu.aut.meixner.entity.task.easy.MemoryGameEntity
import org.springframework.data.repository.CrudRepository

interface MemoryGameRepository : CrudRepository<MemoryGameEntity, Long>