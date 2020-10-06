package hu.aut.meixner.repository.result

import hu.aut.meixner.entity.result.StudentEntity
import org.springframework.data.repository.CrudRepository

interface StudentRepository : CrudRepository<StudentEntity, Long>