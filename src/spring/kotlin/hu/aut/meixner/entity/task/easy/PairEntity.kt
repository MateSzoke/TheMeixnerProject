package hu.aut.meixner.entity.task.easy

import hu.aut.meixner.entity.task.MediaItemEntity
import javax.persistence.*

@Entity
data class PairEntity(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        @ManyToOne(fetch = FetchType.EAGER)
        var pairingEntity: PairingEntity? = null,
        @OneToMany(cascade = arrayOf(CascadeType.ALL), fetch = FetchType.EAGER)
        val pair: MutableList<MediaItemEntity> = mutableListOf()
)