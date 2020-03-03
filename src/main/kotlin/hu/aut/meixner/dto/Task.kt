package hu.aut.meixner.dto

import java.time.OffsetDateTime

open class Task(
        val id: Int = 0,
        val title: String = "",
        val difficulty: DifficultyEnum = DifficultyEnum.MEDIUM,
        val lastModified: OffsetDateTime = OffsetDateTime.now()
)