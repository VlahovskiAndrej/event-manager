package com.sorsix.eventmanager.service

import com.sorsix.eventmanager.domain.Coupon
import com.sorsix.eventmanager.domain.request.CreateCouponRequest


interface CouponService {
    fun createCoupon(couponRequest: CreateCouponRequest): Coupon;

    fun getCouponByName(name: String): Coupon?

    fun getAll(): List<Coupon>;

    fun deleteCoupon(name: String): Unit
}