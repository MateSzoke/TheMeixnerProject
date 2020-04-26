package hu.aut.meixner.entity.task.other

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
data class BlindMapTagEntity(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        val text: String = "",
        val x: Double = 0.0,
        val y: Double = 0.0
)