package hu.aut.meixner.dto.task.common

import hu.aut.meixner.domain.task.MediaItemType
import org.springframework.web.multipart.MultipartFile

class MediaItemRequest(
        val type: MediaItemType,
        val content: String,
        val file: MultipartFile? = null
)