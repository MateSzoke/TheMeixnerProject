package hu.aut.meixner.service.task.easy

import hu.aut.meixner.dto.mapping.toDomainModel
import hu.aut.meixner.dto.mapping.toEntity
import hu.aut.meixner.dto.task.easy.PairingRequest
import hu.aut.meixner.dto.task.easy.PairingResponse
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.repository.task.easytask.PairingRepository
import org.springframework.stereotype.Service
import java.time.OffsetDateTime

@Service
class PairingService(
        private val pairingRepository: PairingRepository
) {

    fun createPairing(pairing: PairingRequest): PairingResponse {
        val pairingEntity = pairing.toEntity(currentUser)
        return pairingRepository.save(pairingEntity).toDomainModel()
    }

    fun updatePairing(id: Long, pairingRequest: PairingRequest): PairingResponse? {
        val pairing = pairingRepository.findById(id).toNullable ?: return null
        if (!pairing.ownerIsTheCurrentUser) return null
        return pairingRepository.save(
                pairingRequest.run {
                    pairing.copy(
                            title = title,
                            pairs = pairs.map { it.toEntity() }.toMutableList(),
                            difficulty = difficulty,
                            lastModified = OffsetDateTime.now()
                    )
                }.apply { this.id = id }
        ).toDomainModel()
    }

}