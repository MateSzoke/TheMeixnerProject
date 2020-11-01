package hu.aut.meixner.entity.task.complex

import org.hibernate.annotations.Cascade
import org.hibernate.annotations.CascadeType
import javax.persistence.*

@Entity
data class SentenceCompletionListEntity(
        @Id @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long = 0,
        val groupTitle: String = "",
        @OneToMany
        @Cascade(CascadeType.ALL)
        val sentences: List<SentenceCompletionItemEntity> = emptyList()
)