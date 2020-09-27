package hu.aut.meixner.service.task.easy

import hu.aut.meixner.dto.task.easy.PairElementResponse
import hu.aut.meixner.dto.task.easy.PairingRequest
import hu.aut.meixner.dto.task.easy.PairingResponse
import hu.aut.meixner.entity.task.MediaItemEntity
import hu.aut.meixner.entity.task.easy.PairEntity
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.task.easy.PairRepository
import hu.aut.meixner.repository.task.easy.PairingRepository
import hu.aut.meixner.service.file.MediaItemService
import org.springframework.stereotype.Service

@Service
class PairingService(
        private val pairingRepository: PairingRepository,
        private val pairRepository: PairRepository,
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
                pairingRequest.toEntity(owner = currentUser, pairs = pairingRequest.pairs.map { pair ->
                    PairEntity(
                            pair = pair.pair.map {
                                mediaItemService.mediaItemRequestToEntity(it) ?: return null
                            }.toMutableList()
                    )
                }).apply { this.id = id }
        ).toDomainModel()
    }

    fun addElementToPairing(id: Long): PairingResponse? {
        println(id)
        val pairing = pairingRepository.findById(id).toNullable ?: return null
        if (!pairing.ownerIsTheCurrentUser) return null
        val pairEntity = PairEntity()
        pairEntity.pairingEntity = pairing
        pairing.pairs.add(pairEntity)
        return pairingRepository.save(pairing.apply { this.id = id }).toDomainModel()
    }

    fun addElementToPairElementInPairing(id: Long): PairElementResponse? {
        println(id)
        val pair = pairRepository.findById(id).toNullable ?: return null
        println("addElementToPairElementInPairing")
        println(pair.pair.size)
        val mediaItemEntity = MediaItemEntity()
        mediaItemEntity.content = "hello"
        pair.pair.add(mediaItemEntity)
        println("addElementToPairElementInPairing 2")
        println(pair.pair.size)
        return pairRepository.save(pair).toDomainModel()
    }

}