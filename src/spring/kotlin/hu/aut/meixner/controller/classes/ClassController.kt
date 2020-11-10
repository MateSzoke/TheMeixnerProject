package hu.aut.meixner.controller.classes

import hu.aut.meixner.dto.classes.ClassRequest
import hu.aut.meixner.entity.classes.ClassResponse
import hu.aut.meixner.service.classes.ClassService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@Api(tags = ["Classes"], description = "Create and get classes, add students and classs to a class")
@RestController
@RequestMapping("/classes")
class ClassController(
        private val classService: ClassService
) {

    @PostMapping("/create")
    @ApiOperation("Creates a new class")
    fun createClasses(@RequestBody @Valid classRequest: ClassRequest): ResponseEntity<ClassResponse> {
        return ResponseEntity.ok(classService.createClass(classRequest))
    }

    @GetMapping("/all")
    @ApiOperation("Get all classes")
    fun getAllClasses(): ResponseEntity<List<ClassResponse>> {
        val result = classService.getClasses()
        return ResponseEntity.ok(result)
    }

    @GetMapping("/{classId}")
    @ApiOperation("Get class by classId")
    fun getClassesById(@PathVariable("classId") classId: Long): ResponseEntity<ClassResponse> {
        val result = classService.getClassById(classId) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }

    @PatchMapping("/update/{classId}")
    @ApiOperation("Update an existing class")
    fun updateClasses(
            @PathVariable("classId") classId: Long,
            @RequestBody @Valid classRequest: ClassRequest
    ): ResponseEntity<ClassResponse> {
        val result = classService.updateClass(classId = classId, request = classRequest)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/exercise/{classId}/{exerciseId}")
    @ApiOperation("Add exercise to a class by id")
    fun addExerciseToClass(
            @PathVariable("classId") classId: Long,
            @PathVariable("exerciseId") exerciseId: Long
    ): ResponseEntity<ClassResponse> {
        val result = classService.changeExerciseToClass(classId = classId, exerciseId = exerciseId, isAdd = true)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }

    @DeleteMapping("/exercise/{classId}/{exerciseId}")
    @ApiOperation("Remove exercise from a class by id")
    fun removeExerciseFromClass(
            @PathVariable("classId") classId: Long,
            @PathVariable("exerciseId") exerciseId: Long
    ): ResponseEntity<ClassResponse> {
        val result = classService.changeExerciseToClass(classId = classId, exerciseId = exerciseId, isAdd = false)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }

    @PostMapping("/student/{classId}/{studentId}")
    @ApiOperation("Add student to a class by id")
    fun addStudentToClass(
            @PathVariable("classId") classId: Long,
            @PathVariable("studentId") studentId: Long
    ): ResponseEntity<ClassResponse> {
        val result = classService.changeStudentToClass(classId = classId, studentId = studentId, isAdd = true)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }

    @DeleteMapping("/student/{classId}/{studentId}")
    @ApiOperation("Remove student from a class by id")
    fun removeStudentFromClass(
            @PathVariable("classId") classId: Long,
            @PathVariable("studentId") studentId: Long
    ): ResponseEntity<ClassResponse> {
        val result = classService.changeStudentToClass(classId = classId, studentId = studentId, isAdd = false)
                ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(result)
    }

    @DeleteMapping("/delete/{classId}")
    @ApiOperation("Delete class by id")
    fun deleteClass(@PathVariable("classId") classId: Long) {
        classService.deleteClass(classId)
    }
}