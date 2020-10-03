package hu.aut.meixner.controller.result

import hu.aut.meixner.dto.auth.UserResponse
import hu.aut.meixner.service.result.ResultService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@Api(tags = ["Results"], description = "Get results and users")
@RestController
@RequestMapping("/results")
class ResultController(
        private val resultService: ResultService
) {

    @GetMapping("/users")
    @ApiOperation("Get all users")
    fun getAllUsers(): ResponseEntity<List<UserResponse>> {
        return ResponseEntity.ok(resultService.getAllUsers())
    }
}