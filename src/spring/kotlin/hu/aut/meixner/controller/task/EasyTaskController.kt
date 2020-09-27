package hu.aut.meixner.controller.task

import hu.aut.meixner.dto.task.easy.*
import hu.aut.meixner.service.task.easy.*
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@Api(tags = ["Easy tasks"], description = "Add and update Pairing, Grouping, Sorting, Sentence completion, Sentence creation tasks")
@RestController
@RequestMapping("/tasks")
class EasyTaskController(
        private val pairingService: PairingService,
        private val groupingService: GroupingService,
        private val sentenceCompletionService: SentenceCompletionService,
        private val sentenceCreationService: SentenceCreationService,
        private val sortingService: SortingService,
        private val trueFalseService: TrueFalseService,
        private val memoryGameService: MemoryGameService
) {

    //region Pairing
    @PostMapping("/pairing")
    @ApiOperation("Creates a new Pairing task.")
    fun createPairing(@RequestBody @Valid pairingRequest: PairingRequest): ResponseEntity<PairingResponse> {
        val response = pairingService.createPairing(pairingRequest) ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(response)
    }

    @PatchMapping("/pairing/{taskId}")
    @ApiOperation("Updates existing Pairing task by taskId.")
    @CrossOrigin(exposedHeaders=["Access-Control-Allow-Origin"])
    fun updatePairingById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid pairingRequest: PairingRequest
    ): ResponseEntity<PairingResponse> {
        val pairing = pairingService.updatePairing(taskId, pairingRequest) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(pairing)
    }

    @PatchMapping("/pairing/newelement/{elementId}")
    @ApiOperation("Adds a new Pair element to pairing by id")
    @CrossOrigin(exposedHeaders=["Access-Control-Allow-Origin"])
    fun addElementToPairingById(
            @PathVariable("elementId") elementId: Long
    ): ResponseEntity<PairingResponse> {
        val pairing = pairingService.addElementToPairing(elementId) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(pairing)
    }

    @PatchMapping("/pairing/newpairelement/{elementId}")
    @ApiOperation("Adds a new Pair element to pairing by id")
    @CrossOrigin(exposedHeaders=["Access-Control-Allow-Origin"])
    fun addElementToPairElementInPairingById(
            @PathVariable("elementId") elementId: Long
    ): ResponseEntity<Boolean> {
        pairingService.addElementToPairElementInPairing(elementId) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(true)
    }
    //endregion

    //region Grouping
    @PostMapping("/grouping")
    @ApiOperation("Creates a new Grouping task.")
    fun createGrouping(@RequestBody @Valid groupingRequest: GroupingRequest): ResponseEntity<GroupingResponse> {
        val result = groupingService.createGrouping(groupingRequest) ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PatchMapping("/grouping/{taskId}")
    @ApiOperation("Updates existing Grouping task by taskId.")
    fun updateGroupingById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid groupingRequest: GroupingRequest
    ): ResponseEntity<GroupingResponse> {
        val grouping = groupingService.updateGrouping(taskId, groupingRequest)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(grouping)
    }
    //endregion


    //region Sentence completion
    @PostMapping("/sentence_completion")
    @ApiOperation("Creates a new Sentence Completion task.")
    fun createSentenceCompletion(@RequestBody @Valid sentenceCompletionRequest: SentenceCompletionRequest): ResponseEntity<SentenceCompletionResponse> {
        return ResponseEntity.ok(sentenceCompletionService.createSentenceCompletion(sentenceCompletionRequest))
    }

    @PatchMapping("/sentence_completion/{taskId}")
    @ApiOperation("Updates existing Sentence completion task by taskId.")
    fun updateSentenceCompletionById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid sentenceCompletionRequest: SentenceCompletionRequest
    ): ResponseEntity<SentenceCompletionResponse> {
        val sentenceCompletion = sentenceCompletionService.updateSentenceCompletion(taskId, sentenceCompletionRequest)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(sentenceCompletion)
    }
    //endregion

    //region Sentence Creation
    @PostMapping("/sentence_creation")
    @ApiOperation("Creates a new Sentence creation task.")
    fun createSentenceCreation(@RequestBody @Valid sentenceCreationRequest: SentenceCreationRequest): ResponseEntity<SentenceCreationResponse> {
        return ResponseEntity.ok(sentenceCreationService.createSentenceCreation(sentenceCreationRequest))
    }

    @PatchMapping("/sentence_creation/{taskId}")
    @ApiOperation("Updates existing Sentence creation task by taskId.")
    fun updateSentenceCreationById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid sentenceCreationRequest: SentenceCreationRequest
    ): ResponseEntity<SentenceCreationResponse> {
        val sentenceCreation = sentenceCreationService.updateSentenceCreation(taskId, sentenceCreationRequest)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(sentenceCreation)
    }
    //endregion

    //region Sorting
    @PostMapping("/sorting")
    @ApiOperation("Creates a new Sorting task.")
    fun createSorting(@RequestBody @Valid sortingRequest: SortingRequest): ResponseEntity<SortingResponse> {
        val result = sortingService.createSorting(sortingRequest) ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PatchMapping("/sorting/{taskId}")
    @ApiOperation("Updates existing Sorting task by taskId.")
    fun updateSortingById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid sortingRequest: SortingRequest
    ): ResponseEntity<SortingResponse> {
        val sortingResponse = sortingService.updateSorting(taskId, sortingRequest)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(sortingResponse)
    }
    //endregion

    //region TrueFalse
    @PostMapping("/trueFalse")
    @ApiOperation("Creates a new TrueFalse task.")
    fun createTrueFalse(@RequestBody @Valid request: TrueFalseRequest): ResponseEntity<TrueFalseResponse> {
        val response = trueFalseService.createTrueFalse(request) ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(response)
    }

    @PatchMapping("/trueFalse/{taskId}")
    @ApiOperation("Updates existing TrueFalse task by taskId.")
    fun updateTrueFalseById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid request: TrueFalseRequest
    ): ResponseEntity<TrueFalseResponse> {
        val result = trueFalseService.updateTrueFalse(taskId, request) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }
    //endregion

    //region MemoryGame
    @PostMapping("/memoryGame")
    @ApiOperation("Creates a new Memory game task.")
    fun createMemoryGame(@RequestBody @Valid request: MemoryGameRequest): ResponseEntity<MemoryGameResponse> {
        val response = memoryGameService.createMemoryGame(request) ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(response)
    }

    @PatchMapping("/memoryGame/{taskId}")
    @ApiOperation("Updates existing Memory game task by taskId.")
    fun updateMemoryGamed(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid request: MemoryGameRequest
    ): ResponseEntity<MemoryGameResponse> {
        val result = memoryGameService.updateMemoryGame(taskId, request) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }
    //endregion

}