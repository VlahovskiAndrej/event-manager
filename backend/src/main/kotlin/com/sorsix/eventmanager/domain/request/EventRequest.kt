package com.sorsix.eventmanager.domain.request

import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import com.sorsix.eventmanager.domain.Category
import org.springframework.web.multipart.MultipartFile
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime
import java.util.Objects
import kotlin.reflect.jvm.internal.impl.load.kotlin.JvmType


data class EventRequest(

    val name: String,

    val description: String,

    val maxPeople: Int, /* number of Tickets */

    val longitude: String,
    val latitude: String,

    val category: Category,

    val tagsNames: List<String>,

    val dateStart: LocalDate,

    val dateFinish: LocalDate,

    var timeStart: LocalTime,

    var timeFinish: LocalTime,

    val meetingUrl: String,

    val type: String,

    val price: Double,

//    val thumbnail: MultipartFile
)
