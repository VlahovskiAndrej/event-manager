package com.sorsix.eventmanager.domain

import jakarta.persistence.*

@Entity
@Table(name = "images")
data class Image(

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val name: String,

    val contentType: String,

    @Lob
    val data: ByteArray,

    @ManyToOne
//    @JoinColumn(name = "event_id")
    val event: Event
)
