package hu.aut.meixner.service.auth

import hu.aut.meixner.dto.auth.UserRequest
import hu.aut.meixner.dto.auth.UserResponse
import hu.aut.meixner.dto.mapping.toDTO
import hu.aut.meixner.dto.mapping.toEntity
import hu.aut.meixner.repository.auth.UserRepository
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService(
        private val userRepository: UserRepository,
        private val bCryptPasswordEncoder: BCryptPasswordEncoder
) {

    fun registerUser(userRequest: UserRequest): UserResponse {
        return userRepository.save(
                userRequest.copy(password = bCryptPasswordEncoder.encode(userRequest.password)).toEntity()
        ).toDTO()
    }

}