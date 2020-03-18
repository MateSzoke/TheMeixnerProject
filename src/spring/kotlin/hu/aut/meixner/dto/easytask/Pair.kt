package hu.aut.meixner.dto.easytask

import hu.aut.meixner.dto.Task

open class Pair(
        val pairName: String,
        val values: MutableMap<String, String>
) : Task()