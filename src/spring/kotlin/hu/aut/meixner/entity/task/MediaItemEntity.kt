package hu.aut.meixner.entity.task

import javax.persistence.*


@Entity
data class MediaItemEntity(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        val type: MediaItemType = MediaItemType.TEXT,
        val content: String = "",
        val fileExtension: String? = null,
        val contentType: String? = null,
        @Lob
        val file: ByteArray? = null
)

