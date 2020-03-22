package hu.aut.meixner.controller.task.easy

import hu.aut.meixner.dto.task.easy.SentenceCreationRequest
import hu.aut.meixner.dto.task.easy.SentenceCreationResponse
import hu.aut.meixner.service.task.easy.SentenceCreationService
import io.swagger.annotations.Api
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@Api(tags = ["Sentence creation"])
@RestController
@RequestMapping("/tasks")
class SentenceCreationController(
        private val sentenceCreationService: SentenceCreationService
) {

    @PostMapping("/sentence_creation")
    fun createSentenceCreation(@RequestBody @Valid sentenceCreationRequest: SentenceCreationRequest): ResponseEntity<SentenceCreationResponse> {
        return ResponseEntity.ok(sentenceCreationService.createSentenceCreation(sentenceCreationRequest))
    }

    @GetMapping("/sentence_creation/{taskId}")
    fun getSentenceCreationById(@PathVariable("taskId") taskId: Long): ResponseEntity<SentenceCreationResponse> {
        val sentenceCreation = sentenceCreationService.getSentenceCreationById(taskId)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(sentenceCreation)
    }

    @PatchMapping("/sentence_creation/{taskId}")
    fun updateSentenceCreationById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid sentenceCreationRequest: SentenceCreationRequest
    ): ResponseEntity<SentenceCreationResponse> {
        val sentenceCreation = sentenceCreationService.updateSentenceCreation(taskId, sentenceCreationRequest)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(sentenceCreation)
    }

    @DeleteMapping("/sentence_creation/{taskId}")
    fun deleteSentenceCreation(@PathVariable("taskId") taskId: Long) {
        sentenceCreationService.deleteSentenceCreation(taskId)
    }

}