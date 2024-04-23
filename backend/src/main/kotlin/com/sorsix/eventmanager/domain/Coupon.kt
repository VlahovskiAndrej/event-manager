package com.sorsix.eventmanager.domain

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jdk.jfr.Percentage

@Entity
data  class Coupon (
    @Id
    val name: String,

    val percentageDiscount: Double
)