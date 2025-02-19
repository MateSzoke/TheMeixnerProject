package hu.aut.meixner.repository.task

import hu.aut.meixner.entity.task.MediaItemEntity
import org.springframework.data.repository.CrudRepository

interface MediaItemRepository : CrudRepository<MediaItemEntity, Long>