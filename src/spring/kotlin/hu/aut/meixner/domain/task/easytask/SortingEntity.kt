package hu.aut.meixner.domain.task.easytask

import hu.aut.meixner.domain.task.MediaItemEntity
import hu.aut.meixner.domain.task.TaskEntity
import hu.aut.meixner.dto.SubjectEnum
import org.hibernate.annotations.Cascade
import org.hibernate.annotations.CascadeType
import java.time.OffsetDateTime
import javax.persistence.Entity
import javax.persistence.OneToMany

@Entity
data class SortingEntity(
        @OneToMany
        @Cascade(CascadeType.ALL)
        val elements: MutableList<MediaItemEntity> = mutableListOf(),
        override val title: String = "",
        override val owner: String = "",
        override val difficulty: Int = 0,
        override val subject: SubjectEnum = SubjectEnum.None,
        override val lastModified: OffsetDateTime = OffsetDateTime.now()
) : TaskEntity()