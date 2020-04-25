package hu.aut.meixner.repository.task.easytask

import hu.aut.meixner.entity.task.easy.SentenceCreationEntity
import org.springframework.data.repository.CrudRepository

interface SentenceCreationRepository : CrudRepository<SentenceCreationEntity, Long>