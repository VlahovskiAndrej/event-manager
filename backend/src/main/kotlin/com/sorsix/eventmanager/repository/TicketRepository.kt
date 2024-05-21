package com.sorsix.eventmanager.repository

import com.sorsix.eventmanager.domain.Event
import com.sorsix.eventmanager.domain.Ticket
import com.sorsix.eventmanager.domain.user.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface TicketRepository : JpaRepository<Ticket, Long>{

    fun findTicketsByBuyer(user: User) : List<Ticket>

    fun findTicketsByEvent(event: Event) : List<Ticket>

    fun findTicketsByBuyerAndEvent(user: User, event: Event) : List<Ticket>

    @Query("SELECT SUM(t.price) FROM Ticket t WHERE t.event.id = :eventId")
    fun findTotalRevenueByEventId(@Param("eventId") eventId: Long?): Double?

    @Query("SELECT COUNT(DISTINCT t.buyer.id) FROM Ticket t WHERE t.event.id = :eventId")
    fun findDistinctCustomerCountByEventId(@Param("eventId") eventId: Long?): Long?

    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.event.id = :eventId")
    fun findTicketCountByEventId(@Param("eventId") eventId: Long?): Long?
}