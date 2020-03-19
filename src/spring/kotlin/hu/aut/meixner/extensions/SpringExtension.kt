package hu.aut.meixner.extensions

import java.util.*

inline val <T : Any> Optional<T>.toNullable: T?
    get() = this.orElse(null)

