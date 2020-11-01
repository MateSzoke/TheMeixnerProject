package hu.aut.meixner.service.auth

import hu.aut.meixner.dto.auth.UserRequest
import hu.aut.meixner.dto.auth.UserResponse
import hu.aut.meixner.dto.auth.UserRole
import hu.aut.meixner.entity.auth.UserRoleEnum.ADMIN
import hu.aut.meixner.entity.auth.UserRoleEnum.STUDENT
import hu.aut.meixner.entity.result.StudentEntity
import hu.aut.meixner.extensions.currentUser
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.auth.UserRepository
import hu.aut.meixner.repository.result.StudentRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service


@Service
class UserService(
        private val userRepository: UserRepository,
        private val studentRepository: StudentRepository,
        private val bCryptPasswordEncoder: BCryptPasswordEncoder
) : UserDetailsService {

    fun registerUser(userRequest: UserRequest): UserResponse {
        val userEntity = userRepository.save(userRequest.copy(password = bCryptPasswordEncoder.encode(userRequest.password)).toEntity())
        if (userRequest.role == UserRole.STUDENT) {
            studentRepository.save(StudentEntity(
                    id = userEntity.id,
                    user = userEntity
            ))
        }
        return userEntity.toDomainModel()
    }

    fun getUser(): UserResponse? {
        return userRepository.findAll().firstOrNull { it.username == currentUser }?.toDomainModel()
    }

    fun getUserById(userId: Long): UserResponse? {
        return userRepository.findByIdOrNull(userId)?.toDomainModel()
    }

    override fun loadUserByUsername(userName: String): UserDetails? {
        val user = userRepository.findByUsername(userName) ?: return null
        return User(user.username, user.password, emptyList())
    }

    fun deleteUser(userId: Long) {
        val user = userRepository.findByIdOrNull(userId) ?: return
        when (user.role) {
            ADMIN -> userRepository.deleteById(userId)
            STUDENT -> studentRepository.deleteById(userId)
        }
    }

}