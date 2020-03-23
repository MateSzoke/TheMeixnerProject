package hu.aut.meixner.controller.task.easy

import hu.aut.meixner.dto.task.easy.SortingRequest
import hu.aut.meixner.dto.task.easy.SortingResponse
import hu.aut.meixner.service.task.easy.SortingService
import io.swagger.annotations.Api
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@Api(tags = ["Sorting"])
@RestController
@RequestMapping("/tasks")
class SortingController(
        private val sortingService: SortingService
) {

    @PostMapping("/sorting")
    fun createSorting(@RequestBody @Valid sortingRequest: SortingRequest): ResponseEntity<SortingResponse> {
        return ResponseEntity.ok(sortingService.createSorting(sortingRequest))
    }

    @PatchMapping("/sorting/{taskId}")
    fun updateSortingById(
            @PathVariable("taskId") taskId: Long,
            @RequestBody @Valid sortingRequest: SortingRequest
    ): ResponseEntity<SortingResponse> {
        val sortingResponse = sortingService.updateSorting(taskId, sortingRequest)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(sortingResponse)
    }

}