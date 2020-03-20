package hu.aut.meixner.repository.task.easytask

import hu.aut.meixner.domain.easytask.Group
import org.springframework.data.repository.CrudRepository

interface GroupRepository : CrudRepository<Group, Long>