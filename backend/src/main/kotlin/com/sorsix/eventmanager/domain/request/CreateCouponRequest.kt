package com.sorsix.eventmanager.domain.request

data class CreateCouponRequest(
    val name: String,

    val percentageDiscount: Double,

//    val eventId: Long,
)
