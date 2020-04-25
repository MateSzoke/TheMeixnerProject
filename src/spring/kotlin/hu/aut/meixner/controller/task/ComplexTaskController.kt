package hu.aut.meixner.controller.task

import hu.aut.meixner.dto.task.complex.GroupingAndSortingRequest
import hu.aut.meixner.dto.task.complex.GroupingAndSortingResponse
import hu.aut.meixner.dto.task.complex.SentenceCreationAndSortingRequest
import hu.aut.meixner.dto.task.complex.SentenceCreationAndSortingResponse
import hu.aut.meixner.service.task.complex.GroupingAndSortingService
import hu.aut.meixner.service.task.complex.SentenceCreationAndSortingService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@Api(tags = ["The complex tasks"], description = "Add and update Grouping and sorting, Sentence completion and grouping, Sentence completion and sorting, Sentence creation and grouping, Sentence creation and sorting, Sorting and grouping")
@RestController
@RequestMapping("/tasks")
class ComplexTaskController(
        private val groupingAndSortingService: GroupingAndSortingService,
        private val sentenceCreationAndSortingService: SentenceCreationAndSortingService
) {
    //region GroupingAndSorting
    @PostMapping("/groupingAndSorting")
    @ApiOperation("Creates a new Grouping and sorting task.")
    fun createGroupingAndSorting(@RequestBody @Valid request: GroupingAndSortingRequest): ResponseEntity<GroupingAndSortingResponse> {
        val result = groupingAndSortingService.createGroupingAndSorting(request)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PatchMapping("/groupingAndSorting/{taskId}")
    @ApiOperation("Updates existing Grouping and sorting task by taskId.")
    fun updateGroupingAndSortingById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid request: GroupingAndSortingRequest
    ): ResponseEntity<GroupingAndSortingResponse> {
        val result = groupingAndSortingService.updateGroupingAndSorting(taskId, request)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }
    //endregion

    //region SentenceCreationAndSorting
    @PostMapping("/sentenceCreationAndSorting")
    @ApiOperation("Creates a new Sentence creation and sorting task.")
    fun createSentenceCreationAndSorting(@RequestBody @Valid request: SentenceCreationAndSortingRequest): ResponseEntity<SentenceCreationAndSortingResponse> {
        val result = sentenceCreationAndSortingService.createSentenceCreationAndSorting(request)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PatchMapping("/sentenceCreationAndSorting/{taskId}")
    @ApiOperation("Updates existing Sentence creation and sorting task by taskId.")
    fun updateSentenceCreationAndSortingById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid request: SentenceCreationAndSortingRequest
    ): ResponseEntity<SentenceCreationAndSortingResponse> {
        val result = sentenceCreationAndSortingService.updateSentenceCreationAndSorting(taskId, request)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }
    //endregion
}