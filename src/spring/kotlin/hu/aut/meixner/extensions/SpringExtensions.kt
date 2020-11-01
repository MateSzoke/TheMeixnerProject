package hu.aut.meixner.extensions

import java.util.logging.Level
import java.util.logging.Logger

fun log(message: String) = Logger.getAnonymousLogger().log(Level.INFO, message)

