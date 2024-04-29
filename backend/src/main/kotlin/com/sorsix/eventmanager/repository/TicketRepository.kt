package com.sorsix.eventmanager.repository

import com.sorsix.eventmanager.domain.Event
import com.sorsix.eventmanager.domain.Ticket
import com.sorsix.eventmanager.domain.user.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TicketRepository : JpaRepository<Ticket, Long>{

    fun findTicketsByBuyer(user: User) : List<Ticket>

    fun findTicketsByEvent(event: Event) : List<Ticket>

    fun findTicketsByBuyerAndEvent(user: User, event: Event) : List<Ticket>
}