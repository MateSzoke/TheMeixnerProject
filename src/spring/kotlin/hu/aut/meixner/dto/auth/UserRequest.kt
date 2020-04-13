package hu.aut.meixner.dto.auth

data class UserRequest(
        val username: String,
        val password: String,
        val role: UserRole
)