package hu.aut.meixner.dto.easytask

import hu.aut.meixner.dto.Task

open class Grouping<T>(
        val groups: List<Group<T>>
) : Task()