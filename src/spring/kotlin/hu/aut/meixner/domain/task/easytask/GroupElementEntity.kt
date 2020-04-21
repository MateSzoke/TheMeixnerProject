package hu.aut.meixner.domain.task.easytask

import hu.aut.meixner.domain.task.MediaItemEntity
import org.hibernate.annotations.Cascade
import org.hibernate.annotations.CascadeType
import javax.persistence.*

@Entity
data class GroupElementEntity(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        val name: String = "",
        @OneToMany
        @Cascade(CascadeType.ALL)
        val elements: MutableList<MediaItemEntity> = mutableListOf()
)