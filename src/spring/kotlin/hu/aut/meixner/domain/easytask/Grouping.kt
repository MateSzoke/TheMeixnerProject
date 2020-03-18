package hu.aut.meixner.domain.easytask

import hu.aut.meixner.domain.Task
import org.hibernate.annotations.Cascade
import org.hibernate.annotations.CascadeType
import javax.persistence.Entity
import javax.persistence.OneToMany

@Entity
data class Grouping(
        @OneToMany
        @Cascade(CascadeType.ALL)
        val groups: List<Group> = emptyList()
) : Task()