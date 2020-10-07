package hu.aut.meixner.controller.result

import hu.aut.meixner.dto.auth.UserResponse
import hu.aut.meixner.dto.result.StudentResponse
import hu.aut.meixner.service.result.ResultService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


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

    @GetMapping("/students")
    @ApiOperation("Get all students")
    fun getAllStudents(): ResponseEntity<List<StudentResponse>> {
        return ResponseEntity.ok(resultService.getAllStudents())
    }

    @GetMapping("/students/{userId}")
    @ApiOperation("Get student by user id")
    fun getStudentById(@PathVariable userId: Long): ResponseEntity<StudentResponse> {
        val student = resultService.getStudentByUserId(userId) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(student)
    }

    @PostMapping("/{userId}/{exercisesId}")
    @ApiOperation("Add exercise to a user by id")
    fun addExercisesToUser(
            @PathVariable("userId") userId: Long,
            @PathVariable("exercisesId") exercisesId: Long
    ): ResponseEntity<StudentResponse> {
        val result = resultService.changeExercisesToStudent(userId = userId, exerciseId = exercisesId, isAdd = true)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }

    @DeleteMapping("/{userId}/{exercisesId}")
    @ApiOperation("Remove exercise from a user by id")
    fun removeExercisesFromUser(
            @PathVariable("userId") userId: Long,
            @PathVariable("exercisesId") exercisesId: Long
    ): ResponseEntity<StudentResponse> {
        val result = resultService.changeExercisesToStudent(userId = userId, exerciseId = exercisesId, isAdd = false)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }

    @DeleteMapping("/student/{userId}")
    @ApiOperation("Delete student and user by user id")
    fun deleteUserById(@PathVariable("userId") userId: Long) {
        resultService.deleteUserById(userId)
    }

}