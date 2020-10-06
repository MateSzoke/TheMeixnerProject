package hu.aut.meixner.entity.result

import hu.aut.meixner.entity.auth.UserEntity
import org.hibernate.annotations.Cascade
import org.hibernate.annotations.CascadeType
import javax.persistence.ElementCollection
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.OneToOne

@Entity
data class StudentEntity(
        @Id
        val id: Long = 0,
        @OneToOne
        @Cascade(CascadeType.ALL)
        val user: UserEntity = UserEntity(),
        @ElementCollection(targetClass = Long::class)
        val exerciseIds: MutableList<Long> = mutableListOf(),
        val classLevel: Int = 0
)