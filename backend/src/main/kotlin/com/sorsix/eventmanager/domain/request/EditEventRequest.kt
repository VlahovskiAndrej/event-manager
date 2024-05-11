package com.sorsix.eventmanager.domain.request

import com.sorsix.eventmanager.domain.Category
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.web.multipart.MultipartFile
import java.time.LocalDate
import java.time.LocalTime


data class EditEventRequest(

//    val file: MultipartFile,

//    val files: List<MultipartFile>,

    val name: String,
    val description: String,
    val longitude: String,
    val latitude: String,
    val category: Category,
    val tagsNames: String,

    @DateTimeFormat(pattern = "EEE MMM dd yyyy")
    val dateStart: LocalDate,

    @DateTimeFormat(pattern = "EEE MMM dd yyyy")
    val dateFinish: LocalDate,

    var timeStart: LocalTime,

    var timeFinish: LocalTime,

    val meetingUrl: String,

    val type: String,

//    val price: Double,

//    val maxPeople: Int, /* number of Tickets */
)
