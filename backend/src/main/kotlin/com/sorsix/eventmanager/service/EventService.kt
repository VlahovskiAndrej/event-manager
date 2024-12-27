package com.sorsix.eventmanager.service

import com.sorsix.eventmanager.domain.Category
import com.sorsix.eventmanager.domain.Event
import com.sorsix.eventmanager.domain.request.EditEventRequest
import com.sorsix.eventmanager.domain.request.PublishTicketsRequest
import com.sorsix.eventmanager.domain.request.CreateEventRequest
import jakarta.servlet.http.HttpServletRequest
import java.time.LocalDate

interface EventService {

    fun createEvent(eventRequest: CreateEventRequest, request: HttpServletRequest) : Event

    fun getEvents(): List<Event>

    fun getEventById(id: Long): Event?

    fun deleteEvent(id: Long)

    fun updateEvent(id: Long, editEventRequest: EditEventRequest): Event

    fun publishTicketsForEventId(publishTicketsRequest: PublishTicketsRequest): Event?

    fun buyTicket(id: Long, num: Int, request: HttpServletRequest): Event?

    fun getEventsByUser(request: HttpServletRequest): List<Event>

    fun searchEvents(query: String): List<Event>

    fun getRecentlyAddedEvents(): List<Event>

    fun getAllCategories(): List<Category>

    fun filterByCategory(category: Category): List<Event>

    fun getRelatedEvents(eventId: Long): List<Event>

    fun filterByDateStart(start: LocalDate): List<Event>

    fun filterByDateFinish(finish: LocalDate): List<Event>

    fun filterByDateStartedAndDateFinished(started: LocalDate, finished: LocalDate): List<Event>

    fun filterByCategories(categories: List<Category>) : List<Event>

    fun filter(query: String?, started:LocalDate?, finished: LocalDate?, categoryNames: List<Category>?) : List<Event>


}