package hu.aut.meixner.controller.task

import hu.aut.meixner.dto.task.other.*
import hu.aut.meixner.service.task.other.BlindMapService
import hu.aut.meixner.service.task.other.OddOneOutService
import hu.aut.meixner.service.task.other.TimelineService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@Api(tags = ["Other tasks"], description = "Add and update Blind map, Memory game, Odd one out, true false, Timeline, Free text")
@RestController
@RequestMapping("/tasks")
class OtherTaskController(
        private val blindMapService: BlindMapService,
        private val timelineService: TimelineService,
        private val oddOneOutService: OddOneOutService
) {
    //region BlindMap
    @PostMapping("/blindMap")
    @ApiOperation("Creates a new Blind map task.")
    fun createBlindMap(@RequestBody @Valid request: BlindMapRequest): ResponseEntity<BlindMapResponse> {
        val response = blindMapService.createBlindMap(request) ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(response)
    }

    @PatchMapping("/blindMap/{taskId}")
    @ApiOperation("Updates existing Blind map task by taskId.")
    fun updateBlindMapById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid request: BlindMapRequest
    ): ResponseEntity<BlindMapResponse> {
        val result = blindMapService.updateBlindMap(taskId, request) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }
    //endregion

    //region Timeline
    @PostMapping("/timeline")
    @ApiOperation("Creates a Timeline task.")
    fun createTimeline(@RequestBody @Valid request: TimelineRequest): ResponseEntity<TimelineResponse> {
        val response = timelineService.createTimeline(request) ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(response)
    }

    @PatchMapping("/timeline/{taskId}")
    @ApiOperation("Updates existing Timeline task by taskId.")
    fun updateTimelineById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid request: TimelineRequest
    ): ResponseEntity<TimelineResponse> {
        val result = timelineService.updateTimeline(taskId, request) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }
    //endregion

    //region OddOneOut
    @PostMapping("/oddOneOut")
    @ApiOperation("Creates a new Odd One Out task.")
    fun createOddOneOut(@RequestBody @Valid request: OddOneOutRequest): ResponseEntity<OddOneOutResponse> {
        val response = oddOneOutService.createOddOneOut(request) ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(response)
    }

    @PatchMapping("/oddOneOut/{taskId}")
    @ApiOperation("Updates existing Odd One Out task by taskId.")
    fun updateBlindMapById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid request: OddOneOutRequest
    ): ResponseEntity<OddOneOutResponse> {
        val result = oddOneOutService.updateOddOneOut(taskId, request) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }
    //endregion
}