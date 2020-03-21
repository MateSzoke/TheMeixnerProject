package hu.aut.meixner.repository.task.easytask

import hu.aut.meixner.domain.easytask.SentenceCompletion
import org.springframework.data.repository.CrudRepository

interface SentenceCompletionRepository : CrudRepository<SentenceCompletion, Long>