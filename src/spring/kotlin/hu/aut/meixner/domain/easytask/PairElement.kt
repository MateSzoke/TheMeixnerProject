package hu.aut.meixner.domain.easytask

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
data class PairElement(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        val name: String = "",
        val pair: Pair<String, String> = Pair("", "")
)