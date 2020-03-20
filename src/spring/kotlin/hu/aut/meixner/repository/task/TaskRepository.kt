package hu.aut.meixner.repository.task

import hu.aut.meixner.domain.Task
import org.springframework.data.repository.CrudRepository

interface TaskRepository : CrudRepository<Task, Long>