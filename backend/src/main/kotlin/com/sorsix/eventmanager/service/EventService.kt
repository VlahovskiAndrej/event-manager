package com.sorsix.eventmanager.service

import com.sorsix.eventmanager.domain.Category
import com.sorsix.eventmanager.domain.Event
import com.sorsix.eventmanager.domain.request.EventRequest
import com.sorsix.eventmanager.domain.request.PublishTicketsRequest
import java.time.LocalDateTime

interface EventService {

    fun createEvent(
        eventRequest: EventRequest
    ) : Event

    fun getEvents(): List<Event>

    fun getEventById(id: Long): Event?

    fun deleteEvent(id: Long) : Unit

    fun updateEvent(
        id: Long,
        name: String,
        description: String,
        maxPeople: Int,
        longitude: String,
        latitude: String,
        categoriesNames: List<String>,
        tagsNames: List<String>,
        dateStart: LocalDateTime,
        dateFinish: LocalDateTime
    ) : Event

    fun addCategory(categoryName: String) : Category

    fun removeCategory(categoryName: String) : Unit

    fun publishTicketsForEventId(publishTicketsRequest: PublishTicketsRequest): Event?

    fun buyTicket(id: Long, num: Int) : Event?

}