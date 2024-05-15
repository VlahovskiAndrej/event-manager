package com.sorsix.eventmanager.repository

import com.sorsix.eventmanager.domain.Coupon
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CouponRepository : JpaRepository<Coupon, String> {

}