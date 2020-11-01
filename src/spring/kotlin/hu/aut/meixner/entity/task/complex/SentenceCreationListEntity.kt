package hu.aut.meixner.entity.task.complex

import hu.aut.meixner.entity.task.easy.SentenceEntity
import org.hibernate.annotations.Cascade
import org.hibernate.annotations.CascadeType
import javax.persistence.*

@Entity
data class SentenceCreationListEntity(
        @Id @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long = 0,
        val groupTitle: String = "",
        @OneToMany
        @Cascade(CascadeType.ALL)
        val sentences: List<SentenceEntity> = emptyList()
)