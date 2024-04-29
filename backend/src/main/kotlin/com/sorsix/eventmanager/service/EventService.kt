package com.sorsix.eventmanager.service

import com.sorsix.eventmanager.domain.Event
import com.sorsix.eventmanager.domain.request.EventRequest
import com.sorsix.eventmanager.domain.request.PublishTicketsRequest
import jakarta.servlet.http.HttpServletRequest
import java.time.LocalDateTime

interface EventService {

    fun createEvent(eventRequest: EventRequest, request: HttpServletRequest) : Event

    fun getEvents(): List<Event>

    fun getEventById(id: Long): Event?


    fun deleteEvent(id: Long)

    fun updateEvent(id: Long, eventRequest: EventRequest) : Event

    fun publishTicketsForEventId(publishTicketsRequest: PublishTicketsRequest): Event?

    fun buyTicket(id: Long, num: Int, request: HttpServletRequest) : Event?

    fun getEventsByUser(request: HttpServletRequest): List<Event>

    fun searchEvents(query : String) : List<Event>

    fun getRecentlyAddedEvents() : List<Event>



}