package com.sorsix.eventmanager.service.impl

import com.sorsix.eventmanager.domain.Category
import com.sorsix.eventmanager.domain.Event
import com.sorsix.eventmanager.domain.Tag
import com.sorsix.eventmanager.domain.Ticket
import com.sorsix.eventmanager.domain.request.EventRequest
import com.sorsix.eventmanager.domain.request.PublishTicketsRequest
import com.sorsix.eventmanager.repository.EventRepository
import com.sorsix.eventmanager.repository.TicketRepository
import com.sorsix.eventmanager.service.EventService
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class EventServiceImpl(
    val eventRepository: EventRepository,
    val ticketRepository: TicketRepository
) : EventService{
    override fun createEvent(
        eventRequest: EventRequest
    ): Event {
        val e= Event(
            id = 0,
            name = eventRequest.name,
            description = eventRequest.description,
            availableTickets = 0,
            longitude = eventRequest.longitude,
            latitude = eventRequest.latitude,
            dateFinish = eventRequest.dateFinish,
            dateStart = eventRequest.dateStart,
            tags = eventRequest.tagsNames.map { tn -> Tag(tn) }.toList(),
            categories = eventRequest.categoriesNames.map { cn -> Category(cn) }.toList()
            )
        eventRepository.save(e)
        return e
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

    override fun updateEvent(
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
    ): Event {
        TODO("Not yet implemented")
    }

    override fun addCategory(categoryName: String): Category {
        TODO("Not yet implemented")
    }

    override fun removeCategory(categoryName: String) {
        TODO("Not yet implemented")
    }

    override fun publishTicketsForEventId(publishTicketsRequest: PublishTicketsRequest) : Event? {
        val event: Event = eventRepository.findById(publishTicketsRequest.eventId).orElse(null)
//        (1..publishTicketsRequest.numberOfTickets).map { ticketRepository.save(Ticket(0, publishTicketsRequest.price, event)) }
        event.availableTickets += publishTicketsRequest.numberOfTickets
        return eventRepository.save(event)
    }

    override fun buyTicket(id: Long, num: Int): Event? {
        val event: Event = eventRepository.findById(id).orElse(null)
        if (event.availableTickets >= num){
            event.availableTickets -= num
            (1 .. num).map { ticketRepository.save(Ticket(0, 5.0, event)) }
        }

        return eventRepository.save(event)
    }


}
