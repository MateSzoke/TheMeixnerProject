package hu.aut.meixner.repository.task.easy

import hu.aut.meixner.entity.task.easy.SortingEntity
import org.springframework.data.repository.CrudRepository

interface SortingRepository : CrudRepository<SortingEntity, Long>