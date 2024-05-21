package com.sorsix.eventmanager.service

import com.sorsix.eventmanager.domain.Stats
import com.sorsix.eventmanager.domain.Ticket
import jakarta.servlet.http.HttpServletRequest

interface TicketService {
    fun getTickets() : List<Ticket>

    fun getTicketsByEventId(eventId: Long) : List<Ticket>

    fun getTicketsByUserId(userId: Long, request: HttpServletRequest) : List<Ticket>

    fun getTicketsByUserIdAndEventId(userId: Long, eventId: Long) : List<Ticket>

    fun getStats(eventId: Long) : Stats
}