package hu.aut.meixner.dto.easytask

import hu.aut.meixner.dto.Task

open class Sorting<T>(
        val elements: MutableList<T>
) : Task()