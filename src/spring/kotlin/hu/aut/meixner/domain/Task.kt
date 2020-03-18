package hu.aut.meixner.domain

import java.time.OffsetDateTime
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.MappedSuperclass

@MappedSuperclass
open class Task(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        val title: String = "",
        val difficulty: Int = 0,
        val lastModified: OffsetDateTime = OffsetDateTime.now()
)