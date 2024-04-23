package com.sorsix.eventmanager.domain.request

import java.time.LocalDateTime


data class EventRequest(

    val name: String,

    val description: String,

    val maxPeople: Int, /* number of Tickets */

    val longitude: String,
    val latitude: String,

    val categoriesNames: List<String>,

    val tagsNames: List<String>,

    val dateStart: LocalDateTime,

    val dateFinish: LocalDateTime,
)
