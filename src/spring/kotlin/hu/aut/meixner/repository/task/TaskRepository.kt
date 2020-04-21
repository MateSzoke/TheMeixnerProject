package hu.aut.meixner.repository.task

import hu.aut.meixner.entity.task.TaskEntity
import org.springframework.data.repository.CrudRepository

interface TaskRepository : CrudRepository<TaskEntity, Long>