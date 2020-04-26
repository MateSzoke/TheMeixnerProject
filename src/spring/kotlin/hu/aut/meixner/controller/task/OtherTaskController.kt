package hu.aut.meixner.controller.task

import hu.aut.meixner.dto.task.other.BlindMapRequest
import hu.aut.meixner.dto.task.other.BlindMapResponse
import hu.aut.meixner.service.task.other.BlindMapService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@Api(tags = ["Other tasks"], description = "Add and update Blind map, Memory game, Odd one out, true false, Timeline, Free text")
@RestController
@RequestMapping("/tasks")
class OtherTaskController(
        private val blindMapService: BlindMapService
) {
    //region Pairing
    @PostMapping("/blindMap")
    @ApiOperation("Creates a new Blind map task.")
    fun createPairing(@RequestBody @Valid request: BlindMapRequest): ResponseEntity<BlindMapResponse> {
        val response = blindMapService.createBlindMap(request) ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(response)
    }

    @PatchMapping("/blindMap/{taskId}")
    @ApiOperation("Updates existing Blind map task by taskId.")
    fun updatePairingById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid request: BlindMapRequest
    ): ResponseEntity<BlindMapResponse> {
        val result = blindMapService.updateBlindMap(taskId, request) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }
    //endregion
}