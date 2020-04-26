package hu.aut.meixner.entity.task.other

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.entity.task.TaskEntity
import org.hibernate.annotations.Cascade
import org.hibernate.annotations.CascadeType
import java.time.OffsetDateTime
import javax.persistence.OneToMany

class TableEntity(
        @OneToMany
        @Cascade(CascadeType.ALL)
        val cols: List<TableRowEntity>,
        override val title: String = "",
        override val owner: String = "",
        override val difficulty: Int = 0,
        override val subject: SubjectEnum = SubjectEnum.None,
        override val recommendedMinClass: Int = 1,
        override val recommendedMaxClass: Int = 8,
        override val lastModified: OffsetDateTime = OffsetDateTime.now()
) : TaskEntity()