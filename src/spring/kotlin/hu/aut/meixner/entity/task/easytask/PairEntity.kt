package hu.aut.meixner.entity.task.easytask

import hu.aut.meixner.entity.task.MediaItemEntity
import org.hibernate.annotations.Cascade
import org.hibernate.annotations.CascadeType
import javax.persistence.*

@Entity
data class PairEntity(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        @OneToMany
        @Cascade(CascadeType.ALL)
        val pair: MutableList<MediaItemEntity> = mutableListOf()
)