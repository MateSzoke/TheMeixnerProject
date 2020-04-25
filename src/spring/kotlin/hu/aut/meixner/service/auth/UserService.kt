package hu.aut.meixner.service.auth

import hu.aut.meixner.dto.auth.UserRequest
import hu.aut.meixner.dto.auth.UserResponse
import hu.aut.meixner.mapping.toDTO
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.repository.auth.UserRepository
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service


@Service
class UserService(
        private val userRepository: UserRepository,
        private val bCryptPasswordEncoder: BCryptPasswordEncoder
) : UserDetailsService {

    fun registerUser(userRequest: UserRequest): UserResponse {
        return userRepository.save(
                userRequest.copy(password = bCryptPasswordEncoder.encode(userRequest.password)).toDomainModel()
        ).toDTO()
    }

    override fun loadUserByUsername(userName: String): UserDetails {
        val user = userRepository.findByUsername(userName)
        return User(user.username, user.password, emptyList())
    }

}