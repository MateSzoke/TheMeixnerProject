package hu.aut.meixner.domain.exercises

import hu.aut.meixner.domain.task.TaskEntity
import org.hibernate.annotations.Cascade
import org.hibernate.annotations.CascadeType
import javax.persistence.*

@Entity
data class ExercisesEntity(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        val name: String = "",
        val comment: String = "",
        @OneToMany
        @Cascade(CascadeType.ALL)
        val tasks: MutableList<TaskEntity> = mutableListOf()
)