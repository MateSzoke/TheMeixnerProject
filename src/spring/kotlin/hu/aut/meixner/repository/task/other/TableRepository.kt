package hu.aut.meixner.repository.task.other

import hu.aut.meixner.entity.task.other.TableEntity
import org.springframework.data.repository.CrudRepository

interface TableRepository : CrudRepository<TableEntity, Long>