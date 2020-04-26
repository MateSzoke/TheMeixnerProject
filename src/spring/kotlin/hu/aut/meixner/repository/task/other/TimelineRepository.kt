package hu.aut.meixner.repository.task.other

import hu.aut.meixner.entity.task.other.TimelineEntity
import org.springframework.data.repository.CrudRepository

interface TimelineRepository : CrudRepository<TimelineEntity, Long>