package hu.aut.meixner.controller.task

import hu.aut.meixner.dto.task.TaskResponse
import hu.aut.meixner.dto.task.easy.*
import hu.aut.meixner.service.task.EasyTaskService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@RestController
@RequestMapping("/tasks")
class TaskController(
        private val easyTaskService: EasyTaskService
) {

    @GetMapping("/{taskId}")
    fun getTaskById(@PathVariable("taskId") taskId: Long): ResponseEntity<TaskResponse> {
        val task = easyTaskService.getTaskById(taskId) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(task)
    }

    //region Pairing
    @PostMapping("/pairing")
    fun createPairing(@RequestBody @Valid pairingRequest: PairingRequest): ResponseEntity<PairingResponse> {
        return ResponseEntity.ok(easyTaskService.createPairing(pairingRequest))
    }

    @GetMapping("/pairing/{taskId}")
    fun getPairingById(@PathVariable("taskId") taskId: Long): ResponseEntity<PairingResponse> {
        val pairing = easyTaskService.getPairingById(taskId) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(pairing)
    }

    @PatchMapping("/pairing/{taskId}")
    fun updatePairingById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid pairingRequest: PairingRequest
    ): ResponseEntity<PairingResponse> {
        val pairing = easyTaskService.updatePairing(taskId, pairingRequest) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(pairing)
    }

    @DeleteMapping("/pairing/{taskId}")
    fun deletePairing(@PathVariable("taskId") taskId: Long) {
        easyTaskService.deletePairing(taskId)
    }
    //endregion

    //region Grouping
    @PostMapping("/grouping")
    fun createGrouping(@RequestBody @Valid groupingRequest: GroupingRequest): ResponseEntity<GroupingResponse> {
        return ResponseEntity.ok(easyTaskService.createGrouping(groupingRequest))
    }

    @GetMapping("/grouping/{taskId}")
    fun getGroupingById(@PathVariable("taskId") taskId: Long): ResponseEntity<GroupingResponse> {
        val grouping = easyTaskService.getGroupingById(taskId) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(grouping)
    }

    @PatchMapping("/grouping/{taskId}")
    fun updateGroupingById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid groupingRequest: GroupingRequest
    ): ResponseEntity<GroupingResponse> {
        val grouping = easyTaskService.updateGrouping(taskId, groupingRequest)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(grouping)
    }

    @DeleteMapping("/grouping/{taskId}")
    fun deleteGrouping(@PathVariable("taskId") taskId: Long) {
        easyTaskService.deleteGrouping(taskId)
    }
    //endregion

    //region SentenceCompletion
    @PostMapping("/sentence_completion")
    fun createSentenceCompletion(@RequestBody @Valid sentenceCompletionRequest: SentenceCompletionRequest): ResponseEntity<SentenceCompletionResponse> {
        return ResponseEntity.ok(easyTaskService.createSentenceCompletion(sentenceCompletionRequest))
    }

    @GetMapping("/sentence_completion/{taskId}")
    fun getSentenceCompletionById(@PathVariable("taskId") taskId: Long): ResponseEntity<SentenceCompletionResponse> {
        val sentenceCompletion = easyTaskService.getSentenceCompletionById(taskId)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(sentenceCompletion)
    }

    @PatchMapping("/sentence_completion/{taskId}")
    fun updateSentenceCompletionById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid sentenceCompletionRequest: SentenceCompletionRequest
    ): ResponseEntity<SentenceCompletionResponse> {
        val sentenceCompletion = easyTaskService.updateSentenceCompletion(taskId, sentenceCompletionRequest)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(sentenceCompletion)
    }

    @DeleteMapping("/sentence_completion/{taskId}")
    fun deleteSentenceCompletion(@PathVariable("taskId") taskId: Long) {
        easyTaskService.deleteSentenceCompletion(taskId)
    }
    //endregion
}