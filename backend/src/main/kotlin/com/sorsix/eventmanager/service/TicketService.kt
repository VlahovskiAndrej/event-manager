package com.sorsix.eventmanager.service

import com.sorsix.eventmanager.domain.Ticket

interface TicketService {
    fun getTickets() : List<Ticket>

//    fun createTicket()

}