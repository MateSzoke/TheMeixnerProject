package hu.aut.meixner.controller.task

import hu.aut.meixner.dto.task.TaskResponse
import hu.aut.meixner.service.task.TaskService
import io.swagger.annotations.Api
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Api(tags = ["Task"])
@RestController
@RequestMapping("/tasks")
class TaskController(
        private val taskService: TaskService
) {

    @GetMapping
    fun getAllTask(): ResponseEntity<List<TaskResponse>> {
        return ResponseEntity.ok(taskService.getAllTasks())
    }

    @GetMapping("/{taskId}")
    fun getTaskById(@PathVariable("taskId") taskId: Long): ResponseEntity<TaskResponse> {
        val task = taskService.getTaskById(taskId) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(task)
    }

}