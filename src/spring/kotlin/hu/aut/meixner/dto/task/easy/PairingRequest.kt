package hu.aut.meixner.dto.task.easy

import hu.aut.meixner.dto.task.TaskRequest
import hu.aut.meixner.dto.task.TypeEnum

open class PairingRequest(
        override val type: TypeEnum = TypeEnum.Pairing,
        override val title: String,
        override val difficulty: Int,
        val pairs: List<PairElement>
): TaskRequest()