package hu.aut.meixner.service.result

import hu.aut.meixner.dto.auth.UserResponse
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.repository.auth.UserRepository
import org.springframework.stereotype.Service

@Service
class ResultService(
        private val userRepository: UserRepository
) {

    fun getAllUsers(): List<UserResponse> {
        return userRepository.findAll().map { it.toDomainModel() }
    }

}
