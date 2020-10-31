package hu.aut.meixner.service.task.other

import hu.aut.meixner.dto.task.other.TableRequest
import hu.aut.meixner.dto.task.other.TableResponse
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.task.other.TableRepository
import hu.aut.meixner.service.file.MediaItemService
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class TableService(
        private val repository: TableRepository,
        private val mediaItemService: MediaItemService
) {
    fun createTable(request: TableRequest): TableResponse? {
        return repository.save(request.toEntity(owner = currentUser, table = request.table.map { col ->
            col.mapNotNull { mediaItemService.mediaItemRequestToEntity(it) ?: return@mapNotNull null }
        })).toDomainModel()
    }

    fun updateTable(id: Long, request: TableRequest): TableResponse? {
        val oddOneOutEntity = repository.findByIdOrNull(id) ?: return null
        if (!oddOneOutEntity.ownerIsTheCurrentUser) return null
        return repository.save(request.toEntity(owner = currentUser, table = request.table.map { col ->
            col.mapNotNull { mediaItemService.mediaItemRequestToEntity(it) ?: return@mapNotNull null }
        })).apply { this.id = id }.toDomainModel()
    }
}