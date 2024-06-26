package com.sorsix.eventmanager.repository

import com.sorsix.eventmanager.domain.Ticket
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TicketRepository : JpaRepository<Ticket, Long>{
}