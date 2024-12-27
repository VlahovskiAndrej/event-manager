package com.sorsix.eventmanager.domain

import jakarta.persistence.*

@Entity
@Table(name = "thumbnails")
data class Thumbnail(

    @Id
    val id: Long = 0,

    val name: String,

    val contentType: String,

    @Lob
    val data: ByteArray
)
