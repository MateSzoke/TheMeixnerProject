package hu.aut.meixner.repository.task.easytask

import hu.aut.meixner.domain.easytask.PairingEntity
import org.springframework.data.repository.CrudRepository

interface PairingRepository : CrudRepository<PairingEntity, Long>
