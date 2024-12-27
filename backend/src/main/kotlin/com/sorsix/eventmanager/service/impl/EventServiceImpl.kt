package com.sorsix.eventmanager.service.impl

import com.sorsix.eventmanager.config.AuthService
import com.sorsix.eventmanager.domain.Category
import com.sorsix.eventmanager.domain.Event
import com.sorsix.eventmanager.domain.Tag
import com.sorsix.eventmanager.domain.Ticket
import com.sorsix.eventmanager.domain.request.EditEventRequest
import com.sorsix.eventmanager.domain.request.PublishTicketsRequest
import com.sorsix.eventmanager.domain.request.CreateEventRequest
import com.sorsix.eventmanager.domain.user.User
import com.sorsix.eventmanager.repository.EventRepository
import com.sorsix.eventmanager.repository.TicketRepository
import com.sorsix.eventmanager.service.EventService
import com.sorsix.eventmanager.service.TagService
import jakarta.servlet.http.HttpServletRequest
import org.springframework.stereotype.Service
import java.nio.file.Path
import java.nio.file.Paths
import java.time.LocalDate
import java.time.Month

@Service
class EventServiceImpl(
    val eventRepository: EventRepository,
    val ticketRepository: TicketRepository,
    val authService: AuthService,
    val tagService: TagService
) : EventService {

    private val root: Path = Paths.get("upload")

    override fun createEvent(eventRequest: CreateEventRequest, request: HttpServletRequest): Event {
        val user: User? = authService.getUserByJwtToken(request)

        val newTags: List<Tag>;
        eventRequest.tagsNames
            .split(',')
            .forEach { tn ->  }


        return eventRepository.save(Event(
            id = 0,
            name = eventRequest.name,
            description = eventRequest.description,
            availableTickets = eventRequest.maxPeople.toInt(),
            longitude = eventRequest.longitude,
            latitude = eventRequest.latitude,
            dateFinish = eventRequest.dateFinish,
            dateStart = eventRequest.dateStart,
            timeStart = eventRequest.timeStart,
            timeFinish = eventRequest.timeFinish,
//
            tags = eventRequest.tagsNames
                .split(',')
                .map { tn -> tagService.createTag(tn.trim()) }
                .toMutableList(),

            category = eventRequest.category,
            type = eventRequest.type,
            price = eventRequest.price.toDouble(),
            meetingUrl = eventRequest.meetingUrl,
            creator = user!!,
//            thumbnailUrl = thumbnailPath,
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

    override fun updateEvent(id: Long, editEventRequest: EditEventRequest): Event {
        val event: Event = eventRepository.findById(id).orElse(null)
        event.name = editEventRequest.name
        event.description = editEventRequest.description
        event.category = editEventRequest.category
        event.tags = editEventRequest.tagsNames.split(',')
            .map { tn -> tagService.createTag(tn.trim()) }
            .toMutableList()
        event.latitude = editEventRequest.latitude
        event.longitude = editEventRequest.longitude
        event.dateStart = editEventRequest.dateStart
        event.dateFinish = editEventRequest.dateFinish
        event.timeStart = editEventRequest.timeStart
        event.timeFinish = editEventRequest.timeFinish
        event.type = editEventRequest.type
//        event.price = editEventRequest.price.toDouble()
        event.meetingUrl = editEventRequest.meetingUrl
        return eventRepository.save(event)
    }

    override fun buyTicket(id: Long, num: Int, request: HttpServletRequest): Event? {
        val event: Event = eventRepository.findById(id).orElse(null)
        val user: User? = authService.getUserByJwtToken(request)
        if (event.availableTickets >= num) {
            event.availableTickets -= num
            (1..num).map { ticketRepository.save(Ticket(0, event.price, event, user!!)) }
        }

        return eventRepository.save(event)
    }

    override fun publishTicketsForEventId(publishTicketsRequest: PublishTicketsRequest): Event? {
        val event: Event = eventRepository.findById(publishTicketsRequest.eventId).orElse(null)
        event.availableTickets += publishTicketsRequest.numberOfTickets
        event.price = publishTicketsRequest.price
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
        return eventRepository.findAllByDateStartAfter(LocalDate.of(2024, Month.MARCH, 1))
    }

    override fun getAllCategories(): List<Category> {
        return eventRepository.findAllCategories()
    }

    override fun filterByCategory(category: Category): List<Event> {
        return eventRepository.findAllEventsByCategory(category)
    }

    override fun getRelatedEvents(eventId: Long): List<Event> {
        val event: Event = eventRepository.findById(eventId).orElse(null)
        return eventRepository.getRelatedEvents(event)
    }

    override fun filterByDateStart(start: LocalDate): List<Event> {
        return eventRepository.findAllByDateStartAfter(start)
    }

    override fun filterByDateFinish(finish: LocalDate): List<Event> {
        return eventRepository.findAllByDateFinishBefore(finish)
    }

    override fun filterByDateStartedAndDateFinished(started: LocalDate, finished: LocalDate): List<Event> {
        return eventRepository.findAllByDateStartAfterAndDateFinishBefore(started, finished)
    }

    override fun filterByCategories(categories: List<Category>): List<Event> {
        return eventRepository.findAllEventsByCategoryIn(categories)
    }

    override fun filter(
        query: String?,
        started: LocalDate?,
        finished: LocalDate?,
        categoryNames: List<Category>?
    ): List<Event> {
        return eventRepository
            .findAllByNameContainingIgnoreCaseAndDateStartAfterAndDateFinishBeforeAndCategoryIn(
                query,
                started,
                finished,
                categoryNames
            )
    }

}
