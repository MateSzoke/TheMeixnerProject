package hu.aut.meixner.service.result

import hu.aut.meixner.dto.auth.UserResponse
import hu.aut.meixner.dto.result.StudentResponse
import hu.aut.meixner.entity.result.StudentEntity
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.repository.auth.UserRepository
import hu.aut.meixner.repository.result.StudentRepository
import hu.aut.meixner.service.exercises.ExerciseService
import org.springframework.stereotype.Service

@Service
class ResultService(
        private val userRepository: UserRepository,
        private val exerciseService: ExerciseService,
        private val studentRepository: StudentRepository
) {

    fun getAllUsers(): List<UserResponse> {
        return userRepository.findAll().map { it.toDomainModel() }
    }

    fun getAllStudents(): List<StudentResponse> {
        return studentRepository.findAll().map { studentEntity ->
            studentEntity.toDomainModel(user = studentEntity.user, exercises = studentEntity.getExercises())
        }
    }

    fun getStudentByUserId(userId: Long): StudentResponse? {
        val user = userRepository.findById(userId).toNullable ?: return null
        val studentEntity = studentRepository.findById(userId).toNullable ?: return null
        return studentEntity.toDomainModel(user = user, exercises = studentEntity.getExercises())
    }

    fun changeExercisesToStudent(userId: Long, exerciseId: Long, isAdd: Boolean): StudentResponse? {
        val user = userRepository.findById(userId).toNullable ?: return null
        val studentEntity = studentRepository.findById(userId).toNullable ?: return null
        if (isAdd) studentEntity.exerciseIds += exerciseId else studentEntity.exerciseIds -= exerciseId
        return studentRepository.save(studentEntity).toDomainModel(user = user, exercises = studentEntity.getExercises())
    }

    private fun StudentEntity.getExercises() = exerciseIds.mapNotNull { id -> exerciseService.getExercisesById(id) }

}
