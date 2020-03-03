package hu.aut.meixner.dto

data class Group<T>(
        val name: String,
        val elements: MutableList<T>
)