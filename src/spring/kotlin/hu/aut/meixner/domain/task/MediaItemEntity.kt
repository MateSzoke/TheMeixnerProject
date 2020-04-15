package hu.aut.meixner.domain.task

import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

data class MediaItemEntity(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        val type: MediaTypeEntity,
        val content: String
)