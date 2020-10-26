package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.task.common.MediaItemResponse

class PairElementResponse(
        val id: Long,
        val pair: List<MediaItemResponse>
)