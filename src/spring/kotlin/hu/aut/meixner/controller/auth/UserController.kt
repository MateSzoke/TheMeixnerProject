package hu.aut.meixner.controller.auth

import hu.aut.meixner.dto.auth.UserRequest
import hu.aut.meixner.dto.auth.UserResponse
import hu.aut.meixner.service.auth.UserService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Api(tags = ["Account"], description = "Register and login")
@RestController
@RequestMapping("/account")
class UserController(
        private val userService: UserService
) {

    @PostMapping("/register")
    @ApiOperation("Registers a new user who can then use the Meixner application")
    fun register(@RequestBody userRequest: UserRequest): ResponseEntity<UserResponse> {
        return ResponseEntity.ok(userService.registerUser(userRequest))
    }
}
