package hu.aut.meixner.dto

import hu.aut.meixner.dto.easytask.Group
import hu.aut.meixner.dto.easytask.Grouping

data class TrueFalse(
        val value: Boolean
) : Grouping<String>(
        listOf(
                Group(name = if (value) "true" else "false", elements = mutableListOf()),
                Group(name = if (value) "false" else "true", elements = mutableListOf())
        )
)