package hu.aut.meixner.dto.mapping

import hu.aut.meixner.dto.auth.UserRequest
import hu.aut.meixner.dto.auth.UserResponse
import hu.aut.meixner.dto.auth.UserRole
import hu.aut.meixner.entity.auth.UserEntity
import hu.aut.meixner.entity.auth.UserRoleEnum

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