package hu.aut.meixner.repository.task.easy

import hu.aut.meixner.entity.task.easy.SentenceCompletionEntity
import org.springframework.data.repository.CrudRepository

interface SentenceCompletionRepository : CrudRepository<SentenceCompletionEntity, Long>