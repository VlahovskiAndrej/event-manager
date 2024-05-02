package com.sorsix.eventmanager.domain.request

import com.sorsix.eventmanager.domain.Category
import java.time.LocalDateTime


data class EventRequest(

    val name: String,

    val description: String,

    val maxPeople: Int, /* number of Tickets */

    val longitude: String,
    val latitude: String,

    val category: Category,

    val tagsNames: List<String>,

    val dateStart: LocalDateTime,

    val dateFinish: LocalDateTime,

    val meetingUrl: String,

    val type: String,

    val price: Double,
)
