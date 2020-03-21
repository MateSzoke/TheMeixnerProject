package hu.aut.meixner.repository.task.easytask

import hu.aut.meixner.domain.easytask.GroupingEntity
import org.springframework.data.repository.CrudRepository

interface GroupingRepository : CrudRepository<GroupingEntity, Long>