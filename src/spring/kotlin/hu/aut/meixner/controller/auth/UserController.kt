package hu.aut.meixner.controller.auth

import hu.aut.meixner.dto.auth.UserRequest
import hu.aut.meixner.dto.auth.UserResponse
import hu.aut.meixner.service.auth.UserService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

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

    @GetMapping("/currentUser")
    @ApiOperation("Get current logged in user")
    fun getCurrentUser(): ResponseEntity<UserResponse> {
        val role = userService.getUser() ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(role)
    }

    @DeleteMapping("/{userId}")
    @ApiOperation("Delete user by user id")
    fun deleteUserById(@PathVariable("userId") userId: Long) {
        userService.deleteUser(userId)
    }
}
