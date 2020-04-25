package hu.aut.meixner.controller.task

import hu.aut.meixner.dto.task.complex.*
import hu.aut.meixner.service.task.complex.*
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
        private val sentenceCreationAndSortingService: SentenceCreationAndSortingService,
        private val sentenceCreationAndGroupingService: SentenceCreationAndGroupingService,
        private val sentenceCompletionAndSortingService: SentenceCompletionAndSortingService,
        private val sentenceCompletionAndGroupingService: SentenceCompletionAndGroupingService
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

    //region SentenceCreationAndGrouping
    @PostMapping("/sentenceCreationAndGrouping")
    @ApiOperation("Creates a new Sentence creation and grouping task.")
    fun createSentenceCreationAndGrouping(@RequestBody @Valid request: SentenceCreationAndGroupingRequest): ResponseEntity<SentenceCreationAndGroupingResponse> {
        val result = sentenceCreationAndGroupingService.createSentenceCreationAndGrouping(request)
        return ResponseEntity.ok(result)
    }

    @PatchMapping("/sentenceCreationAndGrouping/{taskId}")
    @ApiOperation("Updates existing Sentence creation and grouping task by taskId.")
    fun updateSentenceCreationAndGroupingById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid request: SentenceCreationAndGroupingRequest
    ): ResponseEntity<SentenceCreationAndGroupingResponse> {
        val result = sentenceCreationAndGroupingService.updateSentenceCreationAndGrouping(taskId, request)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }
    //endregion

    //region SentenceCompletionAndSorting
    @PostMapping("/sentenceCompletionAndSorting")
    @ApiOperation("Creates a new Sentence completion and sorting task.")
    fun createSentenceCompletionAndSorting(@RequestBody @Valid request: SentenceCompletionAndSortingRequest): ResponseEntity<SentenceCompletionAndSortingResponse> {
        val result = sentenceCompletionAndSortingService.createSentenceCompletionAndSorting(request)
        return ResponseEntity.ok(result)
    }

    @PatchMapping("/sentenceCompletionAndSorting/{taskId}")
    @ApiOperation("Updates existing Sentence completion and sorting task by taskId.")
    fun updateSentenceCompletionAndSortingById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid request: SentenceCompletionAndSortingRequest
    ): ResponseEntity<SentenceCompletionAndSortingResponse> {
        val result = sentenceCompletionAndSortingService.updateSentenceCompletionAndSorting(taskId, request)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }
    //endregion

    //region SentenceCompletionAndGrouping
    @PostMapping("/sentenceCompletionAndGrouping")
    @ApiOperation("Creates a new Sentence completion and grouping task.")
    fun createSentenceCompletionAndGrouping(@RequestBody @Valid request: SentenceCompletionAndGroupingRequest): ResponseEntity<SentenceCompletionAndGroupingResponse> {
        val result = sentenceCompletionAndGroupingService.createSentenceCompletionAndGrouping(request)
        return ResponseEntity.ok(result)
    }

    @PatchMapping("/sentenceCompletionAndGrouping/{taskId}")
    @ApiOperation("Updates existing Sentence completion and grouping task by taskId.")
    fun updateSentenceCompletionAndGroupingById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid request: SentenceCompletionAndGroupingRequest
    ): ResponseEntity<SentenceCompletionAndGroupingResponse> {
        val result = sentenceCompletionAndGroupingService.updateSentenceCompletionAndGrouping(taskId, request)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }
    //endregion
}