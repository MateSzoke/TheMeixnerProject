package hu.aut.meixner.entity.task.other

import java.time.OffsetDateTime
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
data class TimelineTagEntity(
        @Id @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long = 0,
        val name: String = "",
        val valueDate: OffsetDateTime? = null,
        val valueInt: Int? = null,
        val valueDouble: Double? = null,
        val tolerance: Double
)