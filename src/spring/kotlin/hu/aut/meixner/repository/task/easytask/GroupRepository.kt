package hu.aut.meixner.repository.task.easytask

import hu.aut.meixner.entity.task.easytask.GroupElementEntity
import org.springframework.data.repository.CrudRepository

interface GroupRepository : CrudRepository<GroupElementEntity, Long>