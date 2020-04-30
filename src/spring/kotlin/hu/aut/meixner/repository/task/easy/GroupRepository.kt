package hu.aut.meixner.repository.task.easy

import hu.aut.meixner.entity.task.easy.GroupElementEntity
import org.springframework.data.repository.CrudRepository

interface GroupRepository : CrudRepository<GroupElementEntity, Long>