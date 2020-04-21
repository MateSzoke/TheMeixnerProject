package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.task.common.TaskRequest

open class PairingRequest(
        override val title: String,
        override val difficulty: Int,
        val pairs: List<PairElementRequest>
): TaskRequest()