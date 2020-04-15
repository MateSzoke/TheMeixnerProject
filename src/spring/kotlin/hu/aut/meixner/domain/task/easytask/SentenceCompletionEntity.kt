package hu.aut.meixner.domain.task.easytask

import hu.aut.meixner.domain.task.TaskEntity
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
        override val difficulty: Int = 0,
        override val lastModified: OffsetDateTime = OffsetDateTime.now()
) : TaskEntity()