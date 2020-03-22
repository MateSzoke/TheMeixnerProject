package hu.aut.meixner.repository.task.easytask

import hu.aut.meixner.domain.easytask.SortingEntity
import org.springframework.data.repository.CrudRepository

interface SortingRepository : CrudRepository<SortingEntity, Long>