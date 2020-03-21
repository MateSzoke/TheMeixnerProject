package hu.aut.meixner.controller.task.easy

import hu.aut.meixner.dto.task.easy.PairingRequest
import hu.aut.meixner.dto.task.easy.PairingResponse
import hu.aut.meixner.service.task.easy.PairingService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@RestController
@RequestMapping("/tasks")
class PairingController(
        private val pairingService: PairingService
) {

    @PostMapping("/pairing")
    fun createPairing(@RequestBody @Valid pairingRequest: PairingRequest): ResponseEntity<PairingResponse> {
        return ResponseEntity.ok(pairingService.createPairing(pairingRequest))
    }

    @GetMapping("/pairing/{taskId}")
    fun getPairingById(@PathVariable("taskId") taskId: Long): ResponseEntity<PairingResponse> {
        val pairing = pairingService.getPairingById(taskId) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(pairing)
    }

    @PatchMapping("/pairing/{taskId}")
    fun updatePairingById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid pairingRequest: PairingRequest
    ): ResponseEntity<PairingResponse> {
        val pairing = pairingService.updatePairing(taskId, pairingRequest) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(pairing)
    }

    @DeleteMapping("/pairing/{taskId}")
    fun deletePairing(@PathVariable("taskId") taskId: Long) {
        pairingService.deletePairing(taskId)
    }

}