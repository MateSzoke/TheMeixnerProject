package hu.aut.meixner.service.task.easy

import hu.aut.meixner.dto.task.easy.PairingRequest
import hu.aut.meixner.dto.task.easy.PairingResponse
import hu.aut.meixner.extensions.toDBModel
import hu.aut.meixner.extensions.toDTOModel
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.repository.task.easytask.PairingRepository
import org.springframework.stereotype.Service
import java.time.OffsetDateTime

@Service
class PairingService(
        private val pairingRepository: PairingRepository
) {

    fun createPairing(pairing: PairingRequest): PairingResponse {
        return pairingRepository.save(pairing.toDBModel()).toDTOModel()
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
        ).toDTOModel()
    }

}