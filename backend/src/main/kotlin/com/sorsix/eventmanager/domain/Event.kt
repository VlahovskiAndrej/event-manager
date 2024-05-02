package com.sorsix.eventmanager.domain

import com.sorsix.eventmanager.domain.user.User
import jakarta.persistence.*

import java.time.LocalDateTime

@Entity
@Table(name = "events")
data class Event(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    var name: String,

    var description: String,

    var availableTickets: Int,

    var longitude: String,
    var latitude: String,

    @Enumerated(EnumType.STRING)
    var category: Category,

    @ManyToMany
    var tags: MutableList<Tag>,

    var dateStart: LocalDateTime,

    var dateFinish: LocalDateTime,

    var meetingUrl: String,

    var type: String,

    var price: Double,

    @ManyToOne
    val creator: User
//    val activeDiscountPercentage: Double
)
