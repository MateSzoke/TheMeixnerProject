package hu.aut.meixner.repository.task.easytask

import hu.aut.meixner.domain.easytask.GroupElement
import org.springframework.data.repository.CrudRepository

interface GroupRepository : CrudRepository<GroupElement, Long>