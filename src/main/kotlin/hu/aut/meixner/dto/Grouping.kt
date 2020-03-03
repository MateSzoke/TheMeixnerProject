package hu.aut.meixner.dto

open class Grouping<T>(
        val groups: List<Group<T>>
) : Task()