package hu.aut.meixner.controller.auth

import hu.aut.meixner.dto.auth.UserRequest
import hu.aut.meixner.dto.auth.UserResponse
import hu.aut.meixner.service.auth.UserService
import io.swagger.annotations.Api
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Api(tags = ["Users"], description = "Register and login")
@RestController
@RequestMapping("/users")
class UserController(
        private val userService: UserService
) {

    @PostMapping("/register")
    fun register(@RequestBody userRequest: UserRequest): ResponseEntity<UserResponse> {
        return ResponseEntity.ok(userService.registerUser(userRequest))
    }
}