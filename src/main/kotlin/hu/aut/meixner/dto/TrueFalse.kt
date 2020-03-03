package hu.aut.meixner.dto

data class TrueFalse(
        val value: Boolean
) : Grouping(
        listOf(
                Group(name = if (value) "true" else "false", elements = mutableListOf()),
                Group(name = if (value) "false" else "true", elements = mutableListOf())
        )
)