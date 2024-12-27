package com.sorsix.eventmanager.web

import com.sorsix.eventmanager.domain.Stats
import com.sorsix.eventmanager.service.TicketService
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin("*")
class TicketsController (
    val ticketService: TicketService
) {
    @GetMapping("")
    fun getTickets(@RequestParam userId: Long?, @RequestParam eventId: Long?, request: HttpServletRequest) : ResponseEntity<Any>{
        if (userId != null && eventId != null)
            return ResponseEntity.ok(ticketService.getTicketsByUserIdAndEventId(userId, eventId))
        else if(eventId != null){
            return ResponseEntity.ok(ticketService.getTicketsByEventId(eventId))
        }
        else if(userId != null){
            return ResponseEntity.ok(ticketService.getTicketsByUserId(userId, request))
        }
        return ResponseEntity.ok(ticketService.getTickets())
    }

    @GetMapping("/{id}/stats")
    fun getStatsForEventId(@PathVariable id: Long): Stats{
        return ticketService.getStats(id)
    }
}