package hu.aut.meixner.entity.task.complex

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.entity.task.TaskEntity
import hu.aut.meixner.entity.task.easy.GroupElementEntity
import org.hibernate.annotations.Cascade
import org.hibernate.annotations.CascadeType
import java.time.OffsetDateTime
import javax.persistence.Entity
import javax.persistence.OneToMany

@Entity
data class SortingAndGroupingEntity(
        @OneToMany
        @Cascade(CascadeType.ALL)
        val groups: List<GroupElementEntity> = emptyList(),
        override val title: String = "",
        override val owner: String = "",
        override var difficulty: Int = 0,
        override val subject: SubjectEnum = SubjectEnum.None,
        override val recommendedMinClass: Int = 1,
        override val recommendedMaxClass: Int = 8,
        override val lastModified: OffsetDateTime = OffsetDateTime.now()
) : TaskEntity()