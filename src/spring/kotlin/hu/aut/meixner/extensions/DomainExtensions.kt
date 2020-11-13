package hu.aut.meixner.extensions

import hu.aut.meixner.entity.task.TaskEntity
import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import kotlin.math.roundToInt

val TaskEntity.ownerIsTheCurrentUser: Boolean
    get() = currentUser == owner

var currentUser: String = ""
    get() = calculateCurrentUser()
    private set

fun calculateCurrentUser(): String {
    return when (val authentication = SecurityContextHolder.getContext().authentication) {
        !is AnonymousAuthenticationToken -> authentication.name
        else -> ""
    }
}

fun TaskEntity.updateDifficulty(attempts: Int): TaskEntity {
    difficulty -= (difficulty / 10.0).roundToInt() - attempts
    return this
}