package hu.aut.meixner.controller.result

import hu.aut.meixner.dto.auth.UserResponse
import hu.aut.meixner.dto.result.ExerciseResult
import hu.aut.meixner.dto.result.StudentResponse
import hu.aut.meixner.dto.result.TaskResultResponse
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

    @PostMapping("/exercises/{userId}/{exercisesId}")
    @ApiOperation("Add exercise to a user by id")
    fun addExercisesToUser(
            @PathVariable("userId") userId: Long,
            @PathVariable("exercisesId") exercisesId: Long
    ): ResponseEntity<StudentResponse> {
        val result = resultService.changeExercisesToStudent(userId = userId, exerciseId = exercisesId, isAdd = true)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }

    @DeleteMapping("/exercises/{userId}/{exercisesId}")
    @ApiOperation("Remove exercise from a user by id")
    fun removeExercisesFromUser(
            @PathVariable("userId") userId: Long,
            @PathVariable("exercisesId") exercisesId: Long
    ): ResponseEntity<StudentResponse> {
        val result = resultService.changeExercisesToStudent(userId = userId, exerciseId = exercisesId, isAdd = false)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/classLevel/{userId}/{classLevel}")
    @ApiOperation("Change class level to a student by user id")
    fun changeClassLevelByUserId(
            @PathVariable("userId") userId: Long,
            @PathVariable("classLevel") classLevel: Int
    ): ResponseEntity<StudentResponse> {
        val result = resultService.changeClassLevelByUserId(userId = userId, classLevel = classLevel)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }

    @DeleteMapping("/student/{userId}")
    @ApiOperation("Delete student and user by user id")
    fun deleteUserById(@PathVariable("userId") userId: Long) {
        resultService.deleteUserById(userId)
    }

    @GetMapping("/all")
    @ApiOperation("Get all student's all results")
    fun getResults(): ResponseEntity<List<TaskResultResponse>> {
        val result = resultService.getResults() ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @GetMapping("/{userId}")
    @ApiOperation("Get all results from student by userId")
    fun getResultsByUserId(@PathVariable("userId") userId: Long): ResponseEntity<List<TaskResultResponse>> {
        val result = resultService.getResultsByUserId(userId) ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @GetMapping("/my")
    @ApiOperation("Get my results as student")
    fun getMyResults(): ResponseEntity<List<TaskResultResponse>> {
        val result = resultService.getMyResults() ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @GetMapping("/solved/{solvedExerciseId}")
    @ApiOperation("Get results of a solved exercise by started exercise id")
    fun getSolvedExerciseResults(@PathVariable("solvedExerciseId") solvedExerciseId: Long): ResponseEntity<ExerciseResult> {
        val result = resultService.getSolvedExerciseResults(solvedExerciseId)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

}