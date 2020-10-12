package hu.aut.meixner.controller.result

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

}