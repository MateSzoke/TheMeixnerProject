package hu.aut.meixner.dto

open class Pair(
        val pairName: String,
        val values: MutableMap<String, String>
) : Task()