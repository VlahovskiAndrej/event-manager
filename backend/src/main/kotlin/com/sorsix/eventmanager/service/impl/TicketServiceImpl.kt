package com.sorsix.eventmanager.service.impl

import com.sorsix.eventmanager.domain.Ticket
import com.sorsix.eventmanager.repository.TicketRepository
import com.sorsix.eventmanager.service.TicketService
import org.springframework.stereotype.Service

@Service
class TicketServiceImpl(
    val ticketRepository: TicketRepository
) : TicketService{
    override fun getTickets() : List<Ticket>{
        return ticketRepository.findAll()
    }
}