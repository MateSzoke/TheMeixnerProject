package hu.aut.meixner.repository.task.easytask

import hu.aut.meixner.entity.task.easy.GroupElementEntity
import org.springframework.data.repository.CrudRepository

interface GroupRepository : CrudRepository<GroupElementEntity, Long>