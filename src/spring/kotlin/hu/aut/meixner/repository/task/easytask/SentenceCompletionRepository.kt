package hu.aut.meixner.repository.task.easytask

import hu.aut.meixner.domain.easytask.SentenceCompletionEntity
import org.springframework.data.repository.CrudRepository

interface SentenceCompletionRepository : CrudRepository<SentenceCompletionEntity, Long>