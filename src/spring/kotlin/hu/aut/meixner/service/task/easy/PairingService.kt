package hu.aut.meixner.service.task.easy

import hu.aut.meixner.dto.mapping.toDomainModel
import hu.aut.meixner.dto.mapping.toEntity
import hu.aut.meixner.dto.task.easy.PairingRequest
import hu.aut.meixner.dto.task.easy.PairingResponse
import hu.aut.meixner.entity.task.easytask.PairEntity
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.repository.task.easytask.PairingRepository
import hu.aut.meixner.service.file.MediaItemService
import org.springframework.stereotype.Service
import java.time.OffsetDateTime

@Service
class PairingService(
        private val pairingRepository: PairingRepository,
        private val mediaItemService: MediaItemService
) {

    fun createPairing(pairing: PairingRequest): PairingResponse? {
        val result = pairing.toEntity(owner = currentUser, pairs = pairing.pairs.map { pair ->
            PairEntity(
                    pair = pair.pair.map {
                        mediaItemService.mediaItemRequestToEntity(it) ?: return null
                    }.toMutableList()
            )
        })
        return pairingRepository.save(result).toDomainModel()
    }

    fun updatePairing(id: Long, pairingRequest: PairingRequest): PairingResponse? {
        val pairing = pairingRepository.findById(id).toNullable ?: return null
        if (!pairing.ownerIsTheCurrentUser) return null
        return pairingRepository.save(
                pairingRequest.run {
                    pairing.copy(
                            title = title,
                            pairs = pairs.map { pair ->
                                PairEntity(pair = pair.pair.map {
                                    mediaItemService.mediaItemRequestToEntity(it) ?: return null
                                }.toMutableList())
                            },
                            difficulty = difficulty,
                            lastModified = OffsetDateTime.now()
                    )
                }.apply { this.id = id }
        ).toDomainModel()
    }

}