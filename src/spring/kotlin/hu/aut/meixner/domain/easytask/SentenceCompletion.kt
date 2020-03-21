package hu.aut.meixner.domain.easytask

import hu.aut.meixner.domain.Task
import java.time.OffsetDateTime
import javax.persistence.ElementCollection
import javax.persistence.Entity

@Entity
data class SentenceCompletion(
        val sentence: String = "",
        @ElementCollection(targetClass = String::class)
        val options: List<String> = emptyList(),
        override val title: String = "",
        override val difficulty: Int = 0,
        override val lastModified: OffsetDateTime = OffsetDateTime.now()
) : Task()