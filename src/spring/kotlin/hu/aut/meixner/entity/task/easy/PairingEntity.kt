package hu.aut.meixner.entity.task.easy

import hu.aut.meixner.dto.SubjectEnum
import hu.aut.meixner.entity.task.TaskEntity
import javax.persistence.CascadeType
import java.time.OffsetDateTime
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.OneToMany

@Entity
data class PairingEntity(
        @OneToMany(mappedBy = "pairingEntity", cascade = arrayOf(CascadeType.ALL), fetch = FetchType.EAGER)
        val pairs: MutableList<PairEntity> = mutableListOf(),
        override val title: String = "",
        override val owner: String = "",
        override val difficulty: Int = 0,
        override val subject: SubjectEnum = SubjectEnum.None,
        override val recommendedMinClass: Int = 1,
        override val recommendedMaxClass: Int = 8,
        override val lastModified: OffsetDateTime = OffsetDateTime.now()
) : TaskEntity()