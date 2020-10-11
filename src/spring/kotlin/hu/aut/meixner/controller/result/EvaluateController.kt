package hu.aut.meixner.controller.result

import hu.aut.meixner.dto.result.TaskResultResponse
import hu.aut.meixner.dto.task.easy.*
import hu.aut.meixner.service.result.EasyTaskEvaluationService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid


@Api(tags = ["Evaluate"], description = "Evaluate student task requests")
@RestController
@RequestMapping("/evaluate")
class EvaluateController(
        private val easyTaskEvaluationService: EasyTaskEvaluationService
) {

    @PostMapping("/pairing/{userId}/{taskId}")
    @ApiOperation("Evaluate pairing request by taskId to a student by user id")
    fun evaluatePairing(
            @PathVariable("userId") userId: Long,
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: PairingRequest
    ): ResponseEntity<TaskResultResponse> {
        val result = easyTaskEvaluationService.evaluatePairing(userId = userId, taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/grouping/{userId}/{taskId}")
    @ApiOperation("Evaluate grouping request by taskId to a student by user id")
    fun evaluateGrouping(
            @PathVariable("userId") userId: Long,
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: GroupingRequest
    ): ResponseEntity<TaskResultResponse> {
        val result = easyTaskEvaluationService.evaluateGrouping(userId = userId, taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/sorting/{userId}/{taskId}")
    @ApiOperation("Evaluate sorting request by taskId to a student by user id")
    fun evaluateSorting(
            @PathVariable("userId") userId: Long,
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: SortingRequest
    ): ResponseEntity<TaskResultResponse> {
        val result = easyTaskEvaluationService.evaluateSorting(userId = userId, taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/sentenceCreation/{userId}/{taskId}")
    @ApiOperation("Evaluate sentence creation request by taskId to a student by user id")
    fun evaluateSentenceCreation(
            @PathVariable("userId") userId: Long,
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: SentenceCreationRequest
    ): ResponseEntity<TaskResultResponse> {
        val result = easyTaskEvaluationService.evaluateSentenceCreation(userId = userId, taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/sentenceCompletion/{userId}/{taskId}")
    @ApiOperation("Evaluate sentence completion request by taskId to a student by user id")
    fun evaluateSentenceCompletion(
            @PathVariable("userId") userId: Long,
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: SentenceCompletionRequest
    ): ResponseEntity<TaskResultResponse> {
        val result = easyTaskEvaluationService.evaluateSentenceCompletion(userId = userId, taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/truefalse/{userId}/{taskId}")
    @ApiOperation("Evaluate true false request by taskId to a student by user id")
    fun evaluateTrueFalse(
            @PathVariable("userId") userId: Long,
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: TrueFalseRequest
    ): ResponseEntity<TaskResultResponse> {
        val result = easyTaskEvaluationService.evaluateTrueFalse(userId = userId, taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/memory/{userId}/{taskId}")
    @ApiOperation("Evaluate memory game request by taskId to a student by user id")
    fun evaluateMemoryGame(
            @PathVariable("userId") userId: Long,
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: MemoryGameRequest
    ): ResponseEntity<TaskResultResponse> {
        val result = easyTaskEvaluationService.evaluateMemoryGame(userId = userId, taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }
}