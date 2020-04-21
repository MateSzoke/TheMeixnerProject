package hu.aut.meixner.repository.task.easytask

import hu.aut.meixner.domain.task.easytask.PairEntity
import org.springframework.data.repository.CrudRepository

interface PairRepository : CrudRepository<PairEntity, Long>