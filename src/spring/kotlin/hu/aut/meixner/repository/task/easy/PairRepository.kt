package hu.aut.meixner.repository.task.easy

import hu.aut.meixner.entity.task.easy.PairEntity
import org.springframework.data.repository.CrudRepository

interface PairRepository : CrudRepository<PairEntity, Long>