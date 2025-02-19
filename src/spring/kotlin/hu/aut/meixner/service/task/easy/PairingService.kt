package hu.aut.meixner.service.task.easy

import hu.aut.meixner.dto.task.easy.PairingRequest
import hu.aut.meixner.dto.task.easy.PairingResponse
import hu.aut.meixner.entity.task.easy.PairEntity
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.mapping.containsRequests
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.task.easy.PairingRepository
import hu.aut.meixner.service.file.MediaItemService
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class PairingService(
        private val pairingRepository: PairingRepository,
        private val mediaItemService: MediaItemService
) {

    fun createPairing(pairing: PairingRequest): PairingResponse? {
        val result = pairing.toEntity(owner = currentUser, pairs = pairing.pairs.map { pair ->
            PairEntity(
                    pair = pair.pair.mapNotNull {
                        mediaItemService.mediaItemRequestToEntity(it) ?: return@mapNotNull null
                    }.toMutableList()
            )
        })
        return pairingRepository.save(result).toDomainModel()
    }

    fun updatePairing(id: Long, pairingRequest: PairingRequest): PairingResponse? {
        val result = pairingRepository.findByIdOrNull(id) ?: return null
        if (!result.ownerIsTheCurrentUser) return null
        return pairingRepository.save(
                pairingRequest.toEntity(owner = currentUser, pairs = pairingRequest.pairs.map { pair ->
                    PairEntity(
                            id = result.pairs.find { it.pair.containsRequests(pair.pair) }?.id ?: 0,
                            pair = pair.pair.mapNotNull {
                                mediaItemService.mediaItemRequestToEntity(it) ?: return@mapNotNull null
                            }.toMutableList()
                    )
                }).apply { this.id = id }
        ).toDomainModel()
    }

}