package com.sorsix.eventmanager.service.impl

import com.sorsix.eventmanager.config.AuthService
import com.sorsix.eventmanager.domain.Category
import com.sorsix.eventmanager.domain.Event
import com.sorsix.eventmanager.domain.Tag
import com.sorsix.eventmanager.domain.Ticket
import com.sorsix.eventmanager.domain.request.EventRequest
import com.sorsix.eventmanager.domain.request.PublishTicketsRequest
import com.sorsix.eventmanager.domain.user.User
import com.sorsix.eventmanager.repository.EventRepository
import com.sorsix.eventmanager.repository.TicketRepository
import com.sorsix.eventmanager.service.EventService
import jakarta.servlet.http.HttpServletRequest
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.time.Month

@Service
class EventServiceImpl(
    val eventRepository: EventRepository,
    val ticketRepository: TicketRepository,
    val authService: AuthService
) : EventService{
    override fun createEvent(eventRequest: EventRequest, request: HttpServletRequest): Event {
        val user: User? = authService.getUserByJwtToken(request)
        return eventRepository.save(Event(
            id = 0,
            name = eventRequest.name,
            description = eventRequest.description,
            availableTickets = eventRequest.maxPeople,
            longitude = eventRequest.longitude,
            latitude = eventRequest.latitude,
            dateFinish = eventRequest.dateFinish,
            dateStart = eventRequest.dateStart,
            tags = eventRequest.tagsNames.map { tn -> Tag(tn) }.toMutableList(),
            category = eventRequest.category,
            type = eventRequest.type,
            price = eventRequest.price,
            meetingUrl = eventRequest.meetingUrl,
            creator=user!!
            ))
    }

    override fun getEvents(): List<Event> {
        return eventRepository.findAll()
    }

    override fun getEventById(id: Long): Event? {
        return eventRepository.findById(id).orElse(null)
    }

    override fun deleteEvent(id: Long) {
        eventRepository.deleteById(id)
    }

    override fun updateEvent(id: Long, eventRequest: EventRequest): Event {
        val event: Event = eventRepository.findById(id).orElse(null)
        event.name = eventRequest.name
        event.description = eventRequest.description
        event.category = eventRequest.category
        event.tags = eventRequest.tagsNames.map { tn -> Tag(tn) }.toMutableList()
        event.latitude = eventRequest.latitude
        event.longitude = eventRequest.longitude
        event.dateStart = eventRequest.dateStart
        event.dateFinish = eventRequest.dateFinish
        event.type = eventRequest.type
        event.price = eventRequest.price
        event.meetingUrl = eventRequest.meetingUrl
        return eventRepository.save(event)
    }

    override fun buyTicket(id: Long, num: Int, request: HttpServletRequest): Event? {
        val event: Event = eventRepository.findById(id).orElse(null)
        val user: User? = authService.getUserByJwtToken(request)
        if (event.availableTickets >= num){
            event.availableTickets -= num
            (1 .. num).map { ticketRepository.save(Ticket(0, 5.0, event, user!!)) }
        }

        return eventRepository.save(event)
    }

    override fun publishTicketsForEventId(publishTicketsRequest: PublishTicketsRequest) : Event? {
        val event: Event = eventRepository.findById(publishTicketsRequest.eventId).orElse(null)
        event.availableTickets += publishTicketsRequest.numberOfTickets
        return eventRepository.save(event)
    }

    override fun getEventsByUser(request: HttpServletRequest): List<Event> {
        val user: User? = authService.getUserByJwtToken(request)
        return eventRepository.findEventsByCreator(user)
    }

    override fun searchEvents(query: String): List<Event> {
        return eventRepository.findAllByNameContainingIgnoreCase(query)
    }

    override fun getRecentlyAddedEvents(): List<Event> {
        return eventRepository.findAllByDateStartAfter(LocalDateTime.of(2024, Month.JANUARY, 1, 0, 0))
    }

    override fun getAllCategories(): List<Category> {
        return eventRepository.findAllCategories()
    }

    override fun filterByCategory(category: Category): List<Event> {
        return eventRepository.findAllEventsByCategory(category)
    }

}
