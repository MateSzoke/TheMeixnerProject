package hu.aut.meixner.controller.task.easy

import hu.aut.meixner.dto.task.easy.SentenceCompletionRequest
import hu.aut.meixner.dto.task.easy.SentenceCompletionResponse
import hu.aut.meixner.service.task.easy.SentenceCompletionService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@RestController
@RequestMapping("/tasks")
class SentenceCompletionController(
        private val sentenceCompletionService: SentenceCompletionService
) {

    @PostMapping("/sentence_completion")
    fun createSentenceCompletion(@RequestBody @Valid sentenceCompletionRequest: SentenceCompletionRequest): ResponseEntity<SentenceCompletionResponse> {
        return ResponseEntity.ok(sentenceCompletionService.createSentenceCompletion(sentenceCompletionRequest))
    }

    @GetMapping("/sentence_completion/{taskId}")
    fun getSentenceCompletionById(@PathVariable("taskId") taskId: Long): ResponseEntity<SentenceCompletionResponse> {
        val sentenceCompletion = sentenceCompletionService.getSentenceCompletionById(taskId)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(sentenceCompletion)
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

    @DeleteMapping("/sentence_completion/{taskId}")
    fun deleteSentenceCompletion(@PathVariable("taskId") taskId: Long) {
        sentenceCompletionService.deleteSentenceCompletion(taskId)
    }

}