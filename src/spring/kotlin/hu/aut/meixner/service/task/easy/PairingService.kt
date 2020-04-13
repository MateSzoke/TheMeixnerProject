package hu.aut.meixner.service.task.easy

import hu.aut.meixner.dto.mapping.toDBModel
import hu.aut.meixner.dto.mapping.toEntity
import hu.aut.meixner.dto.task.easy.PairingRequest
import hu.aut.meixner.dto.task.easy.PairingResponse
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.repository.task.easytask.PairingRepository
import hu.aut.meixner.service.auth.UserService
import org.springframework.stereotype.Service
import java.time.OffsetDateTime

@Service
class PairingService(
        private val pairingRepository: PairingRepository,
        private val userService: UserService
) {

    fun createPairing(pairing: PairingRequest): PairingResponse {
        return pairingRepository.save(pairing.toDBModel(userService.getCurrentUsername())).toEntity()
    }

    fun updatePairing(id: Long, pairingRequest: PairingRequest): PairingResponse? {
        val pairing = pairingRepository.findById(id).toNullable ?: return null
        return pairingRepository.save(
                pairingRequest.run {
                    pairing.copy(
                            title = title,
                            pairs = pairs.map { it.toDBModel() },
                            lastModified = OffsetDateTime.now()
                    )
                }.apply { this.id = id }
        ).toEntity()
    }

}