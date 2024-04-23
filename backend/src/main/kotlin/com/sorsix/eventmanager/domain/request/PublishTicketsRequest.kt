package com.sorsix.eventmanager.domain.request

data class PublishTicketsRequest(
    val eventId: Long,
    val price: Double,
    val numberOfTickets: Int
)
