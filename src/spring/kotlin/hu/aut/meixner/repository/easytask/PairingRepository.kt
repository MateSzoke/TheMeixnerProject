package hu.aut.meixner.repository.easytask

import hu.aut.meixner.domain.easytask.Pairing
import org.springframework.data.repository.CrudRepository

interface PairingRepository : CrudRepository<Pairing, Long>
