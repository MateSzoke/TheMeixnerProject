package hu.aut.meixner.controller.exercises

import hu.aut.meixner.dto.exercises.ExerciseRequest
import hu.aut.meixner.dto.exercises.ExercisesResponse
import hu.aut.meixner.service.exercises.ExerciseService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@Api(tags = ["Exercises"], description = "Create and manage exercises for a group of tasks")
@RestController
@RequestMapping("/exercises")
class ExerciseController(
        private val exerciseService: ExerciseService
) {

    @PostMapping("/create")
    @ApiOperation("Creates a new exercises group")
    fun createExercises(@RequestBody @Valid exerciseRequest: ExerciseRequest): ResponseEntity<ExercisesResponse> {
        return ResponseEntity.ok(exerciseService.createExercises(exerciseRequest))
    }

    @GetMapping("/myExercises")
    @ApiOperation("Get exercises of the current user")
    fun getMyExercises(): ResponseEntity<List<ExercisesResponse>> {
        val result = exerciseService.getMyExercises()
        return ResponseEntity.ok(result)
    }

    @GetMapping("/{exercisesId}")
    @ApiOperation("Get the exercises group by exercisesId")
    fun getExercisesById(@PathVariable("exercisesId") exercisesId: Long): ResponseEntity<ExercisesResponse> {
        val result = exerciseService.getExercisesById(exercisesId) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }

    @PatchMapping("/update/{exercisesId}")
    @ApiOperation("Update an existing exercises group")
    fun updateExercises(
            @PathVariable("exercisesId") exercisesId: Long,
            @RequestBody @Valid exerciseRequest: ExerciseRequest
    ): ResponseEntity<ExercisesResponse> {
        val result = exerciseService.updateExercises(exercisesId = exercisesId, exerciseRequest = exerciseRequest)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/{exercisesId}/{taskId}")
    @ApiOperation("Add task to an exercises group by id")
    fun addTaskToExercises(
            @PathVariable("exercisesId") exercisesId: Long,
            @PathVariable("taskId") taskId: Long
    ): ResponseEntity<ExercisesResponse> {
        val result = exerciseService.addTaskToExercises(exercisesId = exercisesId, taskId = taskId)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }

    @DeleteMapping("/{exercisesId}/{taskId}")
    @ApiOperation("Remove task from an exercises group by id")
    fun removeTaskFromExercises(
            @PathVariable("exercisesId") exercisesId: Long,
            @PathVariable("taskId") taskId: Long
    ): ResponseEntity<ExercisesResponse> {
        val result = exerciseService.removeTaskFromExercises(exercisesId = exercisesId, taskId = taskId)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }

    @DeleteMapping("/delete/{exercisesId}")
    @ApiOperation("Delete exercise group by id")
    fun deleteExercises(@PathVariable("exercisesId") exercisesId: Long) {
        exerciseService.deleteExercises(exercisesId)
    }

}
