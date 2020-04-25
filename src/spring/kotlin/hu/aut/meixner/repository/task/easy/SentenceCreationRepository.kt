package hu.aut.meixner.repository.task.easy

import hu.aut.meixner.entity.task.easy.SentenceCreationEntity
import org.springframework.data.repository.CrudRepository

interface SentenceCreationRepository : CrudRepository<SentenceCreationEntity, Long>