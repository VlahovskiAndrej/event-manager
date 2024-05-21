package com.sorsix.eventmanager.service.impl

import com.sorsix.eventmanager.config.AuthService
import com.sorsix.eventmanager.domain.Event
import com.sorsix.eventmanager.domain.Stats
import com.sorsix.eventmanager.domain.Ticket
import com.sorsix.eventmanager.domain.user.User
import com.sorsix.eventmanager.repository.EventRepository
import com.sorsix.eventmanager.repository.TicketRepository
import com.sorsix.eventmanager.repository.UserRepository
import com.sorsix.eventmanager.service.TicketService
import jakarta.servlet.http.HttpServletRequest
import org.springframework.stereotype.Service

@Service
class TicketServiceImpl(
    val ticketRepository: TicketRepository,
    val eventRepository: EventRepository,
    val userRepository: UserRepository,
    val authService: AuthService
) : TicketService{
    override fun getTickets() : List<Ticket>{
        return ticketRepository.findAll()
    }

    override fun getTicketsByEventId(eventId: Long): List<Ticket> {
        val event: Event = eventRepository.findById(eventId).orElse(null)
        return ticketRepository.findTicketsByEvent(event)
    }

    override fun getTicketsByUserId(userId: Long, request: HttpServletRequest): List<Ticket> {
        val user: User = authService.getUserByJwtToken(request) ?: throw Exception("user not found")
        return ticketRepository.findTicketsByBuyer(user)
    }

    override fun getTicketsByUserIdAndEventId(userId: Long, eventId: Long): List<Ticket> {
        val event: Event = eventRepository.findById(eventId).orElse(null)
        val user: User = userRepository.findById(userId).get()
        return ticketRepository.findTicketsByBuyerAndEvent(user, event)
    }

    override fun getStats(eventId: Long): Stats {
        return Stats(
            ticketRepository.findTotalRevenueByEventId(eventId),
            ticketRepository.findTicketCountByEventId(eventId),
            ticketRepository.findDistinctCustomerCountByEventId(eventId)
        )
    }
}