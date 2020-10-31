package hu.aut.meixner.extensions

import java.util.*
import java.util.logging.Level
import java.util.logging.Logger

inline val <T : Any> Optional<T>.toNullable: T?
    get() = this.orElse(null)

    fun log(message: String) = Logger.getAnonymousLogger().log(Level.INFO, message)

