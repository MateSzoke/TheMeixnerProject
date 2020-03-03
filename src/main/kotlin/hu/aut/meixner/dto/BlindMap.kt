package hu.aut.meixner.dto

class BlindMap(
        val imageResource: String,
        val tags: MutableList<BlindMapTag>
) : Task()