package hu.aut.meixner.entity.task.easy

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.entity.task.TaskEntity
import java.time.OffsetDateTime
import javax.persistence.ElementCollection
import javax.persistence.Entity

@Entity
data class SentenceCompletionEntity(
        val sentence: String = "",
        @ElementCollection(targetClass = String::class)
        val options: MutableList<String> = mutableListOf(),
        override val title: String = "",
        override val owner: String = "",
        override val subject: SubjectEnum = SubjectEnum.None,
        override val recommendedMinClass: Int = 1,
        override val recommendedMaxClass: Int = 8,
        override val difficulty: Int = 0,
        override val lastModified: OffsetDateTime = OffsetDateTime.now()
) : TaskEntity()