package com.sorsix.eventmanager.domain

import com.sorsix.eventmanager.domain.user.User
import jakarta.persistence.*

@Entity
data class Ticket(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    val price: Double,

    @ManyToOne
    val event: Event,

    @ManyToOne
    val buyer: User
)
