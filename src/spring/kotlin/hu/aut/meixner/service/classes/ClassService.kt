package hu.aut.meixner.service.classes

import hu.aut.meixner.dto.classes.ClassRequest
import hu.aut.meixner.dto.exercises.ExercisesResponse
import hu.aut.meixner.dto.result.StudentResponse
import hu.aut.meixner.entity.classes.ClassResponse
import hu.aut.meixner.entity.result.StudentEntity
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.classes.ClassRepository
import hu.aut.meixner.repository.result.StudentRepository
import hu.aut.meixner.service.exercises.ExerciseService
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class ClassService(
        private val classRepository: ClassRepository,
        private val studentRepository: StudentRepository,
        private val exerciseService: ExerciseService
) {

    fun createClass(request: ClassRequest): ClassResponse {
        return classRepository.save(request.toEntity()).toDomainModel(students = emptyList(), exercises = emptyList())
    }

    fun updateClass(classId: Long, request: ClassRequest): ClassResponse? {
        val currentClass = classRepository.findByIdOrNull(classId) ?: return null
        return classRepository.save(currentClass.copy(
                name = request.name,
                classLevel = request.classLevel
        )).toDomainModel(students = emptyList(), exercises = emptyList())
    }

    fun deleteClass(classId: Long) {
        classRepository.deleteById(classId)
    }

    fun getClasses(): List<ClassResponse> {
        return classRepository.findAll().map { it.toDomainModel(students = getStudents(it.id), exercises = getExercises(it.id)) }
    }

    fun getClassById(classId: Long): ClassResponse? {
        return classRepository.findByIdOrNull(classId)?.toDomainModel(students = getStudents(classId), exercises = getExercises(classId))
    }

    fun changeStudentToClass(studentId: Long, classId: Long, isAdd: Boolean): ClassResponse? {
        val student = studentRepository.findByIdOrNull(studentId) ?: return null
        val currentClass = classRepository.findByIdOrNull(classId) ?: return null
        if (isAdd) {
            currentClass.studentIds += studentId
            currentClass.exerciseIds.forEach { exerciseId ->
                if (!student.exerciseIds.contains(exerciseId))
                    student.exerciseIds += exerciseId
            }
        } else {
            currentClass.studentIds -= studentId
            student.exerciseIds -= currentClass.exerciseIds
        }
        return classRepository.save(currentClass).toDomainModel(students = getStudents(classId), exercises = getExercises(classId))
    }

    fun changeExerciseToClass(exerciseId: Long, classId: Long, isAdd: Boolean): ClassResponse? {
        if (exerciseService.getExercisesById(exerciseId) == null) return null
        val currentClass = classRepository.findByIdOrNull(classId) ?: return null
        if (isAdd) currentClass.exerciseIds += exerciseId else currentClass.exerciseIds -= exerciseId
        currentClass.studentIds.mapNotNull { id ->
            val studentEntity = studentRepository.findByIdOrNull(id) ?: return@mapNotNull null
            if (isAdd) studentEntity.exerciseIds += exerciseId else studentEntity.exerciseIds -= exerciseId
            studentRepository.save(studentEntity)
        }
        return classRepository.save(currentClass).toDomainModel(students = getStudents(classId), exercises = getExercises(classId))
    }

    private fun getStudents(classId: Long): List<StudentResponse> {
        val currentClass = classRepository.findByIdOrNull(classId) ?: return emptyList()
        return currentClass.studentIds.mapNotNull { id ->
            val studentEntity = studentRepository.findByIdOrNull(id)
            studentEntity?.toDomainModel(user = studentEntity.user, exercises = studentEntity.getExercises())
        }
    }

    private fun getExercises(classId: Long): List<ExercisesResponse> {
        val currentClass = classRepository.findByIdOrNull(classId) ?: return emptyList()
        return currentClass.exerciseIds.mapNotNull { id -> exerciseService.getExercisesById(id) }
    }

    private fun StudentEntity.getExercises() = exerciseIds.mapNotNull { id -> exerciseService.getExercisesById(id) }

}