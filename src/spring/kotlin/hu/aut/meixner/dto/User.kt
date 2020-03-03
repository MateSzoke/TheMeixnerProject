package hu.aut.meixner.dto

data class User(
        val id: Int,
        val username: String,
        val password: String,
        val role: UserRole
)