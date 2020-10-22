package hu.aut.meixner.service.result

import hu.aut.meixner.dto.auth.UserResponse
import hu.aut.meixner.dto.result.ExerciseResult
import hu.aut.meixner.dto.result.StudentResponse
import hu.aut.meixner.entity.result.StudentEntity
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.mapping.toDomainModel
import hu.aut.meixner.repository.auth.UserRepository
import hu.aut.meixner.repository.result.SolvedExerciseRepository
import hu.aut.meixner.repository.result.StudentRepository
import hu.aut.meixner.repository.result.TaskResultRepository
import hu.aut.meixner.service.auth.UserService
import hu.aut.meixner.service.exercises.ExerciseService
import hu.aut.meixner.service.task.TaskService
import org.springframework.stereotype.Service

@Service
class ResultService(
        private val userRepository: UserRepository,
        private val exerciseService: ExerciseService,
        private val studentRepository: StudentRepository,
        private val taskResultRepository: TaskResultRepository,
        private val taskService: TaskService,
        private val userService: UserService,
        private val solvedExerciseRepository: SolvedExerciseRepository
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
        if (isAdd && studentEntity.exerciseIds.contains(exerciseId).not())
            studentEntity.exerciseIds += exerciseId
        else
            studentEntity.exerciseIds -= exerciseId
        return studentRepository.save(studentEntity).toDomainModel(user = user, exercises = studentEntity.getExercises())
    }

    fun deleteUserById(userId: Long) {
        studentRepository.deleteById(userId)
    }

    fun changeClassLevelByUserId(userId: Long, classLevel: Int): StudentResponse? {
        val student = studentRepository.findById(userId).toNullable ?: return null
        val user = userRepository.findById(userId).toNullable ?: return null
        return studentRepository.save(student.copy(classLevel = classLevel))
                .toDomainModel(user = user, exercises = student.getExercises())
    }

    fun getResultsByUserId(userId: Long): List<ExerciseResult>? {
        return getExerciseResults(userService.getUserById(userId) ?: return null)
    }

    fun getMyResults(): List<ExerciseResult>? {
        return getExerciseResults(userService.getUser() ?: return null)
    }

    fun getSolvedExerciseResults(solvedExerciseId: Long): ExerciseResult? {
        val solvedExercise = solvedExerciseRepository.findById(solvedExerciseId).toNullable ?: return null
        val taskResults = solvedExercise.taskResultIds.mapNotNull {
            val task = taskResultRepository.findById(it).toNullable
            task?.toDomainModel(
                    taskResult = taskService.getTaskById(task.resultTaskId) ?: return@mapNotNull null,
                    currentResult = task.currentResults,
                    user = userService.getUser() ?: return@mapNotNull null
            )
        }
        return ExerciseResult(
                taskResults = taskResults,
                exerciseName = exerciseService.getExercisesById(solvedExercise.exerciseId)?.name ?: return null,
                averageAttempts = solvedExercise.attempts.average(),
                lastModified = solvedExercise.lastModified
        )
    }

    private fun getExerciseResults(user: UserResponse): List<ExerciseResult>? {
        val taskResults = taskResultRepository.findAll().filter { it.student.id == user.id }
        return solvedExerciseRepository.findAll().filter { it.userId == user.id }.map { solvedExercise ->
            ExerciseResult(
                    taskResults = taskResults.filter { it.id in solvedExercise.taskResultIds }.mapNotNull { taskResult ->
                        taskResult.toDomainModel(
                                taskResult = taskService.getTaskById(taskResult.resultTaskId) ?: return@mapNotNull null,
                                currentResult = taskResult.currentResults,
                                user = user)
                    },
                    exerciseName = exerciseService.getExercisesById(solvedExercise.exerciseId)?.name ?: return null,
                    averageAttempts = solvedExercise.attempts.average(),
                    lastModified = solvedExercise.lastModified
            )
        }
    }

    private fun StudentEntity.getExercises() = exerciseIds.mapNotNull { id -> exerciseService.getExercisesById(id) }

}
