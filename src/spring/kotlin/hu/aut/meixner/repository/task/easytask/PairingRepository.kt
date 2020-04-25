package hu.aut.meixner.repository.task.easytask

import hu.aut.meixner.entity.task.easy.PairingEntity
import org.springframework.data.repository.CrudRepository

interface PairingRepository : CrudRepository<PairingEntity, Long>
