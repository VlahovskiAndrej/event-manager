package com.sorsix.eventmanager.domain

import jakarta.persistence.*

import java.time.LocalDateTime

@Entity
@Table(name = "events")
data class Event(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    val name: String,

    val description: String,

    var availableTickets: Int, /* number of Tickets */

    val longitude: String,
    val latitude: String,

    @Enumerated(EnumType.STRING)
    val category: Category,

    @ManyToMany
    val tags: MutableList<Tag>,

    val dateStart: LocalDateTime,

    val dateFinish: LocalDateTime,
//    val activeDiscountPercentage: Double
)
