package hu.aut.meixner.service.task.other

import hu.aut.meixner.dto.task.other.TimelineRequest
import hu.aut.meixner.dto.task.other.TimelineResponse
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.extensions.ownerIsTheCurrentUser
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.task.other.TimelineRepository
import org.springframework.stereotype.Service

@Service
class TimelineService(
        private val repository: TimelineRepository
) {
    fun createTimeline(request: TimelineRequest): TimelineResponse? {
        return repository.save(request.toEntity(owner = currentUser)).toDomainModel()
    }

    fun updateTimeline(id: Long, request: TimelineRequest): TimelineResponse? {
        val timelineEntity = repository.findById(id).toNullable ?: return null
        if (!timelineEntity.ownerIsTheCurrentUser) return null
        return repository.save(
                request.toEntity(owner = currentUser).apply { this.id = id }
        ).toDomainModel()
    }
}