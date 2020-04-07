package hu.aut.meixner.domain.auth

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
data class UserEntity(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        val username: String = "",
        val password: String = "",
        val roleEnum: UserRoleEnum = UserRoleEnum.ADMIN
)