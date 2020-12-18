package hu.aut.meixner.assertions

import kotlin.test.assertEquals

infix fun String?.equals(other: String) = assertEquals(this, other)

infix fun Boolean.equals(other: Boolean) = assertEquals(this, other)

infix fun Int.equals(other: Int) = assertEquals(this, other)

infix fun Long.equals(other: Long) = assertEquals(this, other)

fun <T : Any?> T.isNotNull(): Boolean {

    return this != null
}
