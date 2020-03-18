package hu.aut.meixner.dto.easytask

data class Group<T>(
        val name: String,
        val elements: MutableList<T>
)