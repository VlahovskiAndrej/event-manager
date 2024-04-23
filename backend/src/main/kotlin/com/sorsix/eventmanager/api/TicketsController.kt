package com.sorsix.eventmanager.api

import com.sorsix.eventmanager.service.EventService
import com.sorsix.eventmanager.service.TicketService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/tickets")
class TicketsController (
    val ticketService: TicketService
) {

    @GetMapping("")
    fun getTickets() : ResponseEntity<Any>{
        return ResponseEntity.ok(ticketService.getTickets())
    }
}