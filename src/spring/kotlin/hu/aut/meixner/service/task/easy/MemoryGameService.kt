package hu.aut.meixner.service.task.easy

import hu.aut.meixner.dto.task.easy.MemoryGameRequest
import hu.aut.meixner.dto.task.easy.MemoryGameResponse
import hu.aut.meixner.entity.task.easy.PairEntity
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.mapping.containsRequests
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.task.easy.MemoryGameRepository
import hu.aut.meixner.service.file.MediaItemService
import org.springframework.stereotype.Service

@Service
class MemoryGameService(
        private val memoryGameRepository: MemoryGameRepository,
        private val mediaItemService: MediaItemService
) {

    fun createMemoryGame(request: MemoryGameRequest): MemoryGameResponse? {
        if (request.pairs.any { it.pair.size !in 1..2 }) return null
        val result = request.toEntity(owner = currentUser, pairs = request.pairs.map { pair ->
            PairEntity(
                    pair = pair.pair.mapNotNull {
                        mediaItemService.mediaItemRequestToEntity(it) ?: return@mapNotNull null
                    }.toMutableList()
            )
        })
        return memoryGameRepository.save(result).toDomainModel()
    }

    fun updateMemoryGame(id: Long, request: MemoryGameRequest): MemoryGameResponse? {
        if (request.pairs.any { it.pair.size !in 1..2 }) return null
        val result = memoryGameRepository.findById(id).toNullable ?: return null
        if (!result.ownerIsTheCurrentUser) return null
        return memoryGameRepository.save(
                request.toEntity(owner = currentUser, pairs = request.pairs.map { pair ->
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