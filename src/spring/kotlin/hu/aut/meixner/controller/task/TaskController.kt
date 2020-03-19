package hu.aut.meixner.controller.task

import hu.aut.meixner.dto.task.easy.PairingRequest
import hu.aut.meixner.dto.task.easy.PairingResponse
import hu.aut.meixner.service.task.EasyTaskService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@RestController
@RequestMapping("/tasks")
class TaskController(
        private val easyTaskService: EasyTaskService
) {

    @PostMapping("/pairing")
    fun createPairing(@RequestBody @Valid pairingRequest: PairingRequest): ResponseEntity<PairingResponse> {
        return ResponseEntity.ok(easyTaskService.createPairing(pairingRequest))
    }

    @GetMapping("/{taskId}")
    fun getPairingById(@PathVariable("taskId") taskId: Long): ResponseEntity<PairingResponse> {
        val pairing = easyTaskService.getPairingById(taskId) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(pairing)
    }

    @PatchMapping("/{taskId}")
    fun updatePairingById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid pairingRequest: PairingRequest
    ): ResponseEntity<PairingResponse> {
        val pairing = easyTaskService.updatePairing(taskId, pairingRequest) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(pairing)
    }

    @DeleteMapping("/{taskId}")
    fun deletePairing(@PathVariable("taskId") taskId: Long) {
        easyTaskService.deletePairing(taskId)
    }

}