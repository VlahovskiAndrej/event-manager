package com.sorsix.eventmanager.service

import com.sorsix.eventmanager.domain.Category
import com.sorsix.eventmanager.domain.Event
import com.sorsix.eventmanager.domain.request.EventRequest
import com.sorsix.eventmanager.domain.request.PublishTicketsRequest
import java.time.LocalDateTime

interface EventService {

    fun createEvent(eventRequest: EventRequest) : Event

    fun getEvents(): List<Event>

    fun getEventById(id: Long): Event?

    fun deleteEvent(id: Long) : Unit

    fun updateEvent(id: Long, eventRequest: EventRequest) : Event

//    fun addCategory(eventId: Long, categoryName: String) : Event?

//    fun removeCategory(eventId: Long, categoryName: String) : Event?

    fun publishTicketsForEventId(publishTicketsRequest: PublishTicketsRequest): Event?

    fun buyTicket(id: Long, num: Int) : Event?

}