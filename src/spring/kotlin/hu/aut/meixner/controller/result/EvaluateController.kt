package hu.aut.meixner.controller.result

import hu.aut.meixner.dto.result.TaskResultResponse
import hu.aut.meixner.dto.task.student.easy.*
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

    @PostMapping("/pairing/{taskId}")
    @ApiOperation("Evaluate pairing request by taskId to a student by user id")
    fun evaluatePairing(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: PairingTaskRequest
    ): ResponseEntity<TaskResultResponse> {
        val result = easyTaskEvaluationService.evaluatePairing(taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/grouping/{taskId}")
    @ApiOperation("Evaluate grouping request by taskId to a student by user id")
    fun evaluateGrouping(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: GroupingTaskRequest
    ): ResponseEntity<TaskResultResponse> {
        val result = easyTaskEvaluationService.evaluateGrouping(taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/sorting/{taskId}")
    @ApiOperation("Evaluate sorting request by taskId to a student by user id")
    fun evaluateSorting(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: SortingTaskRequest
    ): ResponseEntity<TaskResultResponse> {
        val result = easyTaskEvaluationService.evaluateSorting(taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/sentenceCreation/{taskId}")
    @ApiOperation("Evaluate sentence creation request by taskId to a student by user id")
    fun evaluateSentenceCreation(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: SentenceCreationTaskRequest
    ): ResponseEntity<TaskResultResponse> {
        val result = easyTaskEvaluationService.evaluateSentenceCreation(taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/sentenceCompletion/{taskId}")
    @ApiOperation("Evaluate sentence completion request by taskId to a student by user id")
    fun evaluateSentenceCompletion(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: SentenceCompletionTaskRequest
    ): ResponseEntity<TaskResultResponse> {
        val result = easyTaskEvaluationService.evaluateSentenceCompletion(taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/truefalse/{taskId}")
    @ApiOperation("Evaluate true false request by taskId to a student by user id")
    fun evaluateTrueFalse(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: TrueFalseTaskRequest
    ): ResponseEntity<TaskResultResponse> {
        val result = easyTaskEvaluationService.evaluateTrueFalse(taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/memory/{taskId}")
    @ApiOperation("Evaluate memory game request by taskId to a student by user id")
    fun evaluateMemoryGame(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: MemoryGameTaskRequest
    ): ResponseEntity<TaskResultResponse> {
        val result = easyTaskEvaluationService.evaluateMemoryGame(taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }
}