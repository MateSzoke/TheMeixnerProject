package hu.aut.meixner.extensions

import hu.aut.meixner.entity.task.TaskEntity
import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder

val TaskEntity.ownerIsTheCurrentUser: Boolean
    get() = SecurityContextHolder.getContext().authentication.name == owner

val currentUser = when (val authentication = SecurityContextHolder.getContext().authentication) {
    !is AnonymousAuthenticationToken -> authentication.name
    else -> ""
}