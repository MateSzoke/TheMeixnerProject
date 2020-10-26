package hu.aut.meixner.repository.task

import hu.aut.meixner.entity.task.MediaItemEntity
import org.springframework.data.repository.CrudRepository
import org.springframework.transaction.annotation.Transactional

@Transactional
interface MediaItemRepository : CrudRepository<MediaItemEntity, Long>