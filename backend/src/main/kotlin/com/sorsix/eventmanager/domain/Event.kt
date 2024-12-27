package com.sorsix.eventmanager.domain

import com.sorsix.eventmanager.domain.user.User
import jakarta.persistence.*
import java.time.LocalDate

import java.time.LocalDateTime
import java.time.LocalTime

@Entity
@Table(name = "events")
data class Event(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @Column(length = 100)
    var name: String,

    @Column(length = 1500)
    var description: String,

    var availableTickets: Int,

    var longitude: String,
    var latitude: String,

    @Enumerated(EnumType.STRING)
    var category: Category,

    @ManyToMany
    var tags: MutableList<Tag>,

    var dateStart: LocalDate,

    var dateFinish: LocalDate,

    var timeStart: LocalTime,

    var timeFinish: LocalTime,

    var meetingUrl: String,

    var type: String,

    var price: Double,

    @ManyToOne
    val creator: User,

//    @OneToMany(mappedBy = "event", cascade = [CascadeType.ALL], orphanRemoval = true)
//    val images: MutableList<Image>

//    var thumbnailUrl: String

//    @OneToMany
//    var images: List<Image>
)
