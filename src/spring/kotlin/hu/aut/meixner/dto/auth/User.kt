package hu.aut.meixner.dto.auth

data class User(
        val id: Int,
        val username: String,
        val password: String,
        val role: UserRole
)