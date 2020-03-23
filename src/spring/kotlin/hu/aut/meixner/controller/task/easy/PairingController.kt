package hu.aut.meixner.controller.task.easy

import hu.aut.meixner.dto.task.easy.PairingRequest
import hu.aut.meixner.dto.task.easy.PairingResponse
import hu.aut.meixner.service.task.easy.PairingService
import io.swagger.annotations.Api
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@Api(tags = ["Pairing"])
@RestController
@RequestMapping("/tasks")
class PairingController(
        private val pairingService: PairingService
) {

    @PostMapping("/pairing")
    fun createPairing(@RequestBody @Valid pairingRequest: PairingRequest): ResponseEntity<PairingResponse> {
        return ResponseEntity.ok(pairingService.createPairing(pairingRequest))
    }

    @PatchMapping("/pairing/{taskId}")
    fun updatePairingById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid pairingRequest: PairingRequest
    ): ResponseEntity<PairingResponse> {
        val pairing = pairingService.updatePairing(taskId, pairingRequest) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(pairing)
    }

}