package hu.aut.meixner.controller.task

import hu.aut.meixner.dto.task.TaskResponse
import hu.aut.meixner.service.task.TaskService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/tasks")
class TaskController(
        private val taskService: TaskService
) {

    @GetMapping("/{taskId}")
    fun getTaskById(@PathVariable("taskId") taskId: Long): ResponseEntity<TaskResponse> {
        val task = taskService.getTaskById(taskId) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(task)
    }

}