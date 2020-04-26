package hu.aut.meixner.repository.task.easy

import hu.aut.meixner.entity.task.easy.GroupingEntity
import org.springframework.data.repository.CrudRepository

interface GroupingRepository : CrudRepository<GroupingEntity, Long>