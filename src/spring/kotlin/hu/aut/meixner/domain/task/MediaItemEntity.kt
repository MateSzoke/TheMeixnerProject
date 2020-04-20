package hu.aut.meixner.domain.task

import javax.persistence.*


@Entity
data class MediaItemEntity(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        val type: MediaItemType = MediaItemType.TEXT,
        val content: String = "",
        @Lob
        val file: ByteArray? = null
)

