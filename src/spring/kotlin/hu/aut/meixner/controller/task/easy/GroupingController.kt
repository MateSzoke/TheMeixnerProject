package hu.aut.meixner.controller.task.easy

import hu.aut.meixner.dto.task.easy.GroupingRequest
import hu.aut.meixner.dto.task.easy.GroupingResponse
import hu.aut.meixner.service.task.easy.GroupingService
import io.swagger.annotations.Api
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@Api(tags = ["Grouping"])
@RestController
@RequestMapping("/tasks")
class GroupingController(
        private val groupingService: GroupingService
) {

    @PostMapping("/grouping")
    fun createGrouping(@RequestBody @Valid groupingRequest: GroupingRequest): ResponseEntity<GroupingResponse> {
        return ResponseEntity.ok(groupingService.createGrouping(groupingRequest))
    }

    @GetMapping("/grouping/{taskId}")
    fun getGroupingById(@PathVariable("taskId") taskId: Long): ResponseEntity<GroupingResponse> {
        val grouping = groupingService.getGroupingById(taskId) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(grouping)
    }

    @PatchMapping("/grouping/{taskId}")
    fun updateGroupingById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid groupingRequest: GroupingRequest
    ): ResponseEntity<GroupingResponse> {
        val grouping = groupingService.updateGrouping(taskId, groupingRequest)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(grouping)
    }

    @DeleteMapping("/grouping/{taskId}")
    fun deleteGrouping(@PathVariable("taskId") taskId: Long) {
        groupingService.deleteGrouping(taskId)
    }

}