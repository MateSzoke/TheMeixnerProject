package hu.aut.meixner.dto.auth

import hu.aut.meixner.entity.auth.UserRoleEnum

data class UserResponse(
        val id: Long,
        val username: String,
        val role: UserRoleEnum
)