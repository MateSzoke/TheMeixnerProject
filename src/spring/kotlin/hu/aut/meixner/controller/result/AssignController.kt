package hu.aut.meixner.controller.result

import hu.aut.meixner.dto.result.AssignedExercise
import hu.aut.meixner.dto.result.StartedExercise
import hu.aut.meixner.dto.task.student.easy.AssignTask
import hu.aut.meixner.service.result.AssignService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Api(tags = ["Assign"], description = "Assign tasks to a student")
@RestController
@RequestMapping("/assign")
class AssignController(
        private val assignService: AssignService
) {

    @GetMapping("/{exerciseId}")
    @ApiOperation("Get assigned tasks by exercise id")
    fun getTasksByExerciseId(@PathVariable("exerciseId") exerciseId: Long): ResponseEntity<List<AssignTask>> {
        val result = assignService.getTasksByExerciseId(exerciseId) ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @GetMapping("/start/{exerciseId}")
    @ApiOperation("Start solving exercise by exercise id")
    fun startExercise(@PathVariable("exerciseId") exerciseId: Long): ResponseEntity<StartedExercise> {
        val result = assignService.startExercise(exerciseId) ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @GetMapping("/myExercises")
    @ApiOperation("Get assigned exercises for the current student (user)")
    fun getMyExercises(): ResponseEntity<List<AssignedExercise>> {
        val result = assignService.getMyExercises() ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

}