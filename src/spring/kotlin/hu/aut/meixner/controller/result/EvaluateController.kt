package hu.aut.meixner.controller.result

import hu.aut.meixner.dto.result.StartedExercise
import hu.aut.meixner.dto.task.student.complex.*
import hu.aut.meixner.dto.task.student.easy.*
import hu.aut.meixner.service.result.AssignService
import hu.aut.meixner.service.result.TaskEvaluationService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid


@Api(tags = ["Evaluate"], description = "Evaluate student task requests")
@RestController
@RequestMapping("/evaluate")
class EvaluateController(
        private val taskEvaluationService: TaskEvaluationService,
        private val assignService: AssignService
) {

    @PostMapping("/pairing/{startedExerciseId}/{taskId}")
    @ApiOperation("Evaluate pairing request by taskId to a student by user id")
    fun evaluatePairing(
            @PathVariable("startedExerciseId") startedExerciseId: Long,
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: PairingTaskRequest
    ): ResponseEntity<StartedExercise> {
        val taskResult = taskEvaluationService.evaluatePairing(taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        val result = assignService.getStartedExercise(startedExerciseId = startedExerciseId, solvedTaskId = taskId, taskResult = taskResult)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/grouping/{startedExerciseId}/{taskId}")
    @ApiOperation("Evaluate grouping request by taskId to a student by user id")
    fun evaluateGrouping(
            @PathVariable("startedExerciseId") startedExerciseId: Long,
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: GroupingTaskRequest
    ): ResponseEntity<StartedExercise> {
        val taskResult = taskEvaluationService.evaluateGrouping(taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        val result = assignService.getStartedExercise(startedExerciseId = startedExerciseId, solvedTaskId = taskId, taskResult = taskResult)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/sorting/{startedExerciseId}/{taskId}")
    @ApiOperation("Evaluate sorting request by taskId to a student by user id")
    fun evaluateSorting(
            @PathVariable("startedExerciseId") startedExerciseId: Long,
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: SortingTaskRequest
    ): ResponseEntity<StartedExercise> {
        val taskResult = taskEvaluationService.evaluateSorting(taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        val result = assignService.getStartedExercise(startedExerciseId = startedExerciseId, solvedTaskId = taskId, taskResult = taskResult)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/sentenceCreation/{startedExerciseId}/{taskId}")
    @ApiOperation("Evaluate sentence creation request by taskId to a student by user id")
    fun evaluateSentenceCreation(
            @PathVariable("startedExerciseId") startedExerciseId: Long,
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: SentenceCreationTaskRequest
    ): ResponseEntity<StartedExercise> {
        val taskResult = taskEvaluationService.evaluateSentenceCreation(taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        val result = assignService.getStartedExercise(startedExerciseId = startedExerciseId, solvedTaskId = taskId, taskResult = taskResult)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/sentenceCompletion/{startedExerciseId}/{taskId}")
    @ApiOperation("Evaluate sentence completion request by taskId to a student by user id")
    fun evaluateSentenceCompletion(
            @PathVariable("startedExerciseId") startedExerciseId: Long,
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: SentenceCompletionTaskRequest
    ): ResponseEntity<StartedExercise> {
        val taskResult = taskEvaluationService.evaluateSentenceCompletion(taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()

        val result = assignService.getStartedExercise(startedExerciseId = startedExerciseId, solvedTaskId = taskId, taskResult = taskResult)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/truefalse/{startedExerciseId}/{taskId}")
    @ApiOperation("Evaluate true false request by taskId to a student by user id")
    fun evaluateTrueFalse(
            @PathVariable("startedExerciseId") startedExerciseId: Long,
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: TrueFalseTaskRequest
    ): ResponseEntity<StartedExercise> {
        val taskResult = taskEvaluationService.evaluateTrueFalse(taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        val result = assignService.getStartedExercise(startedExerciseId = startedExerciseId, solvedTaskId = taskId, taskResult = taskResult)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/memory/{startedExerciseId}/{taskId}")
    @ApiOperation("Evaluate memory game request by taskId to a student by user id")
    fun evaluateMemoryGame(
            @PathVariable("startedExerciseId") startedExerciseId: Long,
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: MemoryGameTaskRequest
    ): ResponseEntity<StartedExercise> {
        val taskResult = taskEvaluationService.evaluateMemoryGame(taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        val result = assignService.getStartedExercise(startedExerciseId = startedExerciseId, solvedTaskId = taskId, taskResult = taskResult)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/groupingAndSorting/{startedExerciseId}/{taskId}")
    @ApiOperation("Evaluate Grouping and Sorting request by taskId to a student by user id")
    fun evaluateGroupingAndSorting(
            @PathVariable("startedExerciseId") startedExerciseId: Long,
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: GroupingAndSortingTaskRequest
    ): ResponseEntity<StartedExercise> {
        val taskResult = taskEvaluationService.evaluateGroupingAndSorting(taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        val result = assignService.getStartedExercise(startedExerciseId = startedExerciseId, solvedTaskId = taskId, taskResult = taskResult)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/sentenceCompletionAndSorting/{startedExerciseId}/{taskId}")
    @ApiOperation("Evaluate Sentence completion and Sorting request by taskId to a student by user id")
    fun evaluateSentenceCompletionAndSorting(
            @PathVariable("startedExerciseId") startedExerciseId: Long,
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: SentenceCompletionAndSortingTaskRequest
    ): ResponseEntity<StartedExercise> {
        val taskResult = taskEvaluationService.evaluateSentenceCompletionAndSorting(taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        val result = assignService.getStartedExercise(startedExerciseId = startedExerciseId, solvedTaskId = taskId, taskResult = taskResult)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/sentenceCompletionAndGrouping/{startedExerciseId}/{taskId}")
    @ApiOperation("Evaluate Sentence completion and Grouping request by taskId to a student by user id")
    fun evaluateSentenceCompletionAndGrouping(
            @PathVariable("startedExerciseId") startedExerciseId: Long,
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: SentenceCompletionAndGroupingTaskRequest
    ): ResponseEntity<StartedExercise> {
        val taskResult = taskEvaluationService.evaluateSentenceCompletionAndGrouping(taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        val result = assignService.getStartedExercise(startedExerciseId = startedExerciseId, solvedTaskId = taskId, taskResult = taskResult)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/sentenceCreationAndGrouping/{startedExerciseId}/{taskId}")
    @ApiOperation("Evaluate Sentence creation and Grouping request by taskId to a student by user id")
    fun evaluateSentenceCreationAndGrouping(
            @PathVariable("startedExerciseId") startedExerciseId: Long,
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: SentenceCreationAndGroupingTaskRequest
    ): ResponseEntity<StartedExercise> {
        val taskResult = taskEvaluationService.evaluateSentenceCreationAndGrouping(taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        val result = assignService.getStartedExercise(startedExerciseId = startedExerciseId, solvedTaskId = taskId, taskResult = taskResult)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/sentenceCreationAndSorting/{startedExerciseId}/{taskId}")
    @ApiOperation("Evaluate Sentence completion and Sorting request by taskId to a student by user id")
    fun evaluateSentenceCreationAndSorting(
            @PathVariable("startedExerciseId") startedExerciseId: Long,
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: SentenceCreationAndSortingTaskRequest
    ): ResponseEntity<StartedExercise> {
        val taskResult = taskEvaluationService.evaluateSentenceCreationAndSorting(taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        val result = assignService.getStartedExercise(startedExerciseId = startedExerciseId, solvedTaskId = taskId, taskResult = taskResult)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/sortingAndGrouping/{startedExerciseId}/{taskId}")
    @ApiOperation("Evaluate Sorting and Grouping request by taskId to a student by user id")
    fun evaluateSortingAndGrouping(
            @PathVariable("startedExerciseId") startedExerciseId: Long,
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid taskRequest: SortingAndGroupingTaskRequest
    ): ResponseEntity<StartedExercise> {
        val taskResult = taskEvaluationService.evaluateSortingAndGrouping(taskId = taskId, taskRequest = taskRequest)
                ?: return ResponseEntity.badRequest().build()
        val result = assignService.getStartedExercise(startedExerciseId = startedExerciseId, solvedTaskId = taskId, taskResult = taskResult)
                ?: return ResponseEntity.badRequest().build()
        return ResponseEntity.ok(result)
    }
}