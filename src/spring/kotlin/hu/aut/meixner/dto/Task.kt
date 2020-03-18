package hu.aut.meixner.dto

import java.time.OffsetDateTime

open class Task(
        val id: Int = 0,
        val title: String = "",
        val difficulty: Int = 0,
        val lastModified: OffsetDateTime = OffsetDateTime.now()
)