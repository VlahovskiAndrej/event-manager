package com.sorsix.eventmanager.domain.request

import com.sorsix.eventmanager.domain.Category
import java.time.LocalDateTime


data class EventRequest(

    //{
    //    "name" : "Mock Event 1",
    //    "description": "This is a mock event",
    //    "maxPeople": 100,
    //    "longitude": "0.00",
    //    "latitude" : "0.00",
    //    "category" : 1,
    //    "tagNames":["Business, Corporate"],
    //    "dateStart":"2023-01-15T10:00:00",
    //    "dateEnd": "2023-01-15T18:00:00"
    //
    // }eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb3JlbmJvc2tvQGdtYWlsLmNvbSIsImlhdCI6MTcxNDA0NDgzMywiZXhwIjoxNzE0MDQ2MjczfQ.RGFR6BP2tBttMi1_E5eeoDhc02BnkwEridml2slejUk
    val name: String,

    val description: String,

    val maxPeople: Int, /* number of Tickets */

    val longitude: String,
    val latitude: String,

    val category: Category,

    val tagsNames: List<String>,

    val dateStart: LocalDateTime,

    val dateFinish: LocalDateTime,
)
