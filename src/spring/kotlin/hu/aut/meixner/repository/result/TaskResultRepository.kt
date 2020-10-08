package hu.aut.meixner.repository.result

import hu.aut.meixner.entity.result.TaskResultEntity
import org.springframework.data.repository.CrudRepository

interface TaskResultRepository : CrudRepository<TaskResultEntity, Long>