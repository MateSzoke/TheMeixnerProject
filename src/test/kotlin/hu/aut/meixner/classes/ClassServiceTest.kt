package hu.aut.meixner.classes

import hu.aut.meixner.assertions.equals
import hu.aut.meixner.dto.classes.ClassRequest
import hu.aut.meixner.entity.classes.ClassEntity
import hu.aut.meixner.mapping.toEntity
import hu.aut.meixner.repository.classes.ClassRepository
import hu.aut.meixner.repository.result.StudentRepository
import hu.aut.meixner.service.classes.ClassService
import org.junit.jupiter.api.Test
import org.mockito.ArgumentCaptor
import org.mockito.Mockito.*
import org.mockito.Mockito.`when` as mockitoWhen


class ClassServiceTest(
        val classRepository: ClassRepository = mock(ClassRepository::class.java),
        val studentRepository: StudentRepository = mock(StudentRepository::class.java),
        val classService: ClassService = mock(ClassService::class.java),
        val classCaptor: ArgumentCaptor<ClassEntity> = ArgumentCaptor.forClass(ClassEntity::class.java)
) {

    @Test
    fun `Create a new class`() {
        val classRequest = ClassRequest("5. B", 5)
        val mockClass = classRequest.toEntity()

        mockitoWhen(classRepository.save(any(ClassEntity::class.java))).thenReturn(mockClass)

        val classResponse = classService.createClass(classRequest)

        verify(classRepository).save(classCaptor.capture())

        val savedClass = classCaptor.value
        classRequest.name equals savedClass.name
        classRequest.classLevel equals savedClass.classLevel

        classResponse.name equals classRequest.name
        classResponse.classLevel equals classRequest.classLevel
        classResponse.exercises equals emptyList()
        classResponse.students equals emptyList()
    }

    @Test
    fun `Add student to class`() {

    }

}