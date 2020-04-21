package hu.aut.meixner.dto.mapping

import hu.aut.meixner.domain.auth.UserEntity
import hu.aut.meixner.domain.auth.UserRoleEnum
import hu.aut.meixner.dto.auth.UserRequest
import hu.aut.meixner.dto.auth.UserResponse
import hu.aut.meixner.dto.auth.UserRole

fun UserRequest.toDomainModel(): UserEntity {
    return UserEntity(
            username = username,
            password = password,
            role = role.toDomainModel()
    )
}

fun UserEntity.toDTO(): UserResponse {
    return UserResponse(
            id = id,
            username = username
    )
}

fun UserRole.toDomainModel(): UserRoleEnum {
    return when (this) {
        UserRole.STUDENT -> UserRoleEnum.STUDENT
        UserRole.ADMIN -> UserRoleEnum.ADMIN
    }
}