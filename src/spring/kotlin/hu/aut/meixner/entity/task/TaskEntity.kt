package hu.aut.meixner.entity.task

import hu.aut.meixner.dto.SubjectEnum
import java.time.OffsetDateTime
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.MappedSuperclass

@MappedSuperclass
abstract class TaskEntity(
        @Id @GeneratedValue(strategy = GenerationType.AUTO)
        var id: Long = 0
) {
    abstract val title: String
    abstract val owner: String
    abstract var difficulty: Int
    abstract val subject: SubjectEnum
    abstract val recommendedMinClass: Int
    abstract val recommendedMaxClass: Int
    abstract val lastModified: OffsetDateTime
}