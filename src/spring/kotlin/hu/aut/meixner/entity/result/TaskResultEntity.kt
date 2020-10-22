package hu.aut.meixner.entity.result

import org.hibernate.annotations.Cascade
import org.hibernate.annotations.CascadeType
import java.time.OffsetDateTime
import javax.persistence.*

@Entity
class TaskResultEntity(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        @ManyToOne
        @Cascade(CascadeType.DELETE)
        val student: StudentEntity = StudentEntity(),
        val resultTaskId: Long = 0,
        @ElementCollection(targetClass = Boolean::class)
        val currentResults: MutableList<Boolean> = mutableListOf(),
        var resultPercentage: Double = 0.0,
        var attempts: Int = 0,
        val lastModified: OffsetDateTime = OffsetDateTime.now()
)