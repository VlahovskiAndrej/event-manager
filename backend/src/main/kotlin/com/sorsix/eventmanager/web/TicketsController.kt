package com.sorsix.eventmanager.web

import com.sorsix.eventmanager.service.TicketService
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

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
}