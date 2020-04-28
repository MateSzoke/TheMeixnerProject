package hu.aut.meixner.extensions

import hu.aut.meixner.entity.task.TaskEntity
import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder

val TaskEntity.ownerIsTheCurrentUser: Boolean
    get() = SecurityContextHolder.getContext().authentication.name == owner

var currentUser: String = ""
    get() = calculateCurrentUser()
    private set

fun calculateCurrentUser(): String {
    return when (val authentication = SecurityContextHolder.getContext().authentication) {
        !is AnonymousAuthenticationToken -> authentication.name
        else -> ""
    }
}