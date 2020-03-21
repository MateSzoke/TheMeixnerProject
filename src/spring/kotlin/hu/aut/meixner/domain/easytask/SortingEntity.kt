package hu.aut.meixner.domain.easytask

import hu.aut.meixner.domain.TaskEntity
import java.time.OffsetDateTime
import javax.persistence.ElementCollection
import javax.persistence.Entity

@Entity
data class SortingEntity(
        @ElementCollection(targetClass = String::class)
        val elements: List<String> = emptyList(),
        override val title: String = "",
        override val difficulty: Int = 0,
        override val lastModified: OffsetDateTime = OffsetDateTime.now()
) : TaskEntity()