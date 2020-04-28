package hu.aut.meixner.mapping

import hu.aut.meixner.dto.auth.UserRequest
import hu.aut.meixner.dto.auth.UserResponse
import hu.aut.meixner.dto.auth.UserRole
import hu.aut.meixner.entity.auth.UserEntity
import hu.aut.meixner.entity.auth.UserRoleEnum

fun UserRequest.toEntity(): UserEntity {
    return UserEntity(
            username = username,
            password = password,
            role = role.toDomainModel()
    )
}

fun UserEntity.toDomainModel(): UserResponse {
    return UserResponse(
            id = id,
            username = username,
            role = role
    )
}

fun UserRole.toDomainModel(): UserRoleEnum {
    return when (this) {
        UserRole.STUDENT -> UserRoleEnum.STUDENT
        UserRole.ADMIN -> UserRoleEnum.ADMIN
    }
}