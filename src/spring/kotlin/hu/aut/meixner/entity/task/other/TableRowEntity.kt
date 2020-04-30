package hu.aut.meixner.entity.task.other

import hu.aut.meixner.entity.task.MediaItemEntity
import org.hibernate.annotations.Cascade
import org.hibernate.annotations.CascadeType
import javax.persistence.*

@Entity
data class TableRowEntity(
        @Id @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long = 0,
        @OneToMany
        @Cascade(CascadeType.ALL)
        val rows: MutableList<MediaItemEntity> = mutableListOf()
)
