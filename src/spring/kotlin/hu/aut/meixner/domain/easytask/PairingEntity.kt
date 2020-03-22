package hu.aut.meixner.domain.easytask

import hu.aut.meixner.domain.TaskEntity
import org.hibernate.annotations.Cascade
import org.hibernate.annotations.CascadeType
import java.time.OffsetDateTime
import javax.persistence.Entity
import javax.persistence.OneToMany

@Entity
data class PairingEntity(
        @OneToMany
        @Cascade(CascadeType.ALL)
        val pairs: List<PairEntity> = emptyList(),
        override val title: String = "",
        override val difficulty: Int = 0,
        override val lastModified: OffsetDateTime = OffsetDateTime.now()
) : TaskEntity()