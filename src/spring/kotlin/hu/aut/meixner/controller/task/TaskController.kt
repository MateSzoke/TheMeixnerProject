package hu.aut.meixner.controller.task

import hu.aut.meixner.dto.task.common.TaskResponse
import hu.aut.meixner.entity.task.easy.PairingEntity
import hu.aut.meixner.service.task.TaskService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@Api(tags = ["Task"], description = "Get all task or delete task.")
@RestController
@RequestMapping("/tasks")
class TaskController(
        private val taskService: TaskService
) {

    @GetMapping
    @ApiOperation("Returns all tasks int the database.")
    fun getAllTask(): ResponseEntity<List<TaskResponse>> {
        return ResponseEntity.ok(taskService.getAllTasks())
    }

    @GetMapping("/myTasks")
    @ApiOperation("Returns all tasks of the current user.")
    fun getMyTask(): ResponseEntity<List<TaskResponse>> {
        return ResponseEntity.ok(taskService.getMyTasks())
    }

    @GetMapping("/{taskId}")
    @ApiOperation("Returns the specific task by it's taskId.")
    fun getTaskById(@PathVariable("taskId") taskId: Long): ResponseEntity<TaskResponse> {
        val task = taskService.getTaskById(taskId) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(task)
    }

    @DeleteMapping("/{taskId}")
    @ApiOperation("Deletes the task by it's taskId.")
    fun deleteTaskById(@PathVariable("taskId") taskId: Long) {
        taskService.deleteTaskById(taskId)
    }

}