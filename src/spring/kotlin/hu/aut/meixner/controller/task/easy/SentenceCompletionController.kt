package hu.aut.meixner.controller.task.easy

import hu.aut.meixner.dto.task.easy.SentenceCompletionRequest
import hu.aut.meixner.dto.task.easy.SentenceCompletionResponse
import hu.aut.meixner.service.task.easy.SentenceCompletionService
import io.swagger.annotations.Api
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@Api(tags = ["Sentence completion"])
@RestController
@RequestMapping("/tasks")
class SentenceCompletionController(
        private val sentenceCompletionService: SentenceCompletionService
) {

    @PostMapping("/sentence_completion")
    fun createSentenceCompletion(@RequestBody @Valid sentenceCompletionRequest: SentenceCompletionRequest): ResponseEntity<SentenceCompletionResponse> {
        return ResponseEntity.ok(sentenceCompletionService.createSentenceCompletion(sentenceCompletionRequest))
    }

    @PatchMapping("/sentence_completion/{taskId}")
    fun updateSentenceCompletionById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid sentenceCompletionRequest: SentenceCompletionRequest
    ): ResponseEntity<SentenceCompletionResponse> {
        val sentenceCompletion = sentenceCompletionService.updateSentenceCompletion(taskId, sentenceCompletionRequest)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(sentenceCompletion)
    }

}