package hu.aut.meixner.service.task

import hu.aut.meixner.dto.task.easy.PairingRequest
import hu.aut.meixner.dto.task.easy.PairingResponse
import hu.aut.meixner.extensions.toDBModel
import hu.aut.meixner.extensions.toDTOModel
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.repository.easytask.GroupRepository
import hu.aut.meixner.repository.easytask.GroupingRepository
import hu.aut.meixner.repository.easytask.PairRepository
import hu.aut.meixner.repository.easytask.PairingRepository
import org.springframework.stereotype.Service
import java.time.OffsetDateTime

@Service
class EasyTaskService(
        private val pairingRepository: PairingRepository,
        private val pairRepository: PairRepository,
        private val groupingRepository: GroupingRepository,
        private val groupRepository: GroupRepository
) {

    fun createPairing(pairing: PairingRequest): PairingResponse {
        return pairingRepository.save(pairing.toDBModel()).toDTOModel()
    }

    fun getPairingById(id: Long): PairingResponse? {
        return pairingRepository.findById(id).toNullable?.toDTOModel() ?: return null
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
                }
        ).toDTOModel()
    }

    fun deletePairing(id: Long) {
        val deletedPairing = pairingRepository.findById(id).toNullable ?: return
        pairingRepository.delete(deletedPairing)
    }

}