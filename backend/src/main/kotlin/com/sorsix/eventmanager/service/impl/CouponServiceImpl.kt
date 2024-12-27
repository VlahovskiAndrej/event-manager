package com.sorsix.eventmanager.service.impl

import com.sorsix.eventmanager.domain.Coupon
import com.sorsix.eventmanager.domain.request.CreateCouponRequest
import com.sorsix.eventmanager.repository.CouponRepository
import com.sorsix.eventmanager.service.CouponService
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class CouponServiceImpl(
    val couponRepository: CouponRepository
) : CouponService {
    override fun createCoupon(couponRequest: CreateCouponRequest): Coupon {
        val c = Coupon(couponRequest.name, couponRequest.percentageDiscount)
        return couponRepository.save(c)
    }

    override fun getCouponByName(name: String): Coupon? {
        return couponRepository.findByIdOrNull(name)
    }

    override fun getAll(): List<Coupon> {
        return couponRepository.findAll()
    }

    override fun deleteCoupon(name: String) {
        return couponRepository.deleteById(name)
    }
}