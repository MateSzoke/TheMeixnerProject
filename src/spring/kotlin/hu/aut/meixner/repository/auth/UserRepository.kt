package hu.aut.meixner.repository.auth

import hu.aut.meixner.entity.auth.UserEntity
import org.springframework.data.repository.CrudRepository

interface UserRepository : CrudRepository<UserEntity, Long> {
    fun findByUsername(username: String): UserEntity?
}