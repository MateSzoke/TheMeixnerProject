package hu.aut.meixner.repository.task.easytask

import hu.aut.meixner.domain.easytask.PairElement
import org.springframework.data.repository.CrudRepository

interface PairRepository : CrudRepository<PairElement, Long>