package com.sorsix.eventmanager.web

import com.sorsix.eventmanager.domain.Coupon
import com.sorsix.eventmanager.domain.Event
import com.sorsix.eventmanager.domain.request.CreateCouponRequest
import com.sorsix.eventmanager.service.CouponService
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api/coupons")
@CrossOrigin("*")
class CouponController(
    val couponService: CouponService
) {

    @GetMapping("")
    fun getAllCoupons(): ResponseEntity<List<Coupon>> {
        return ResponseEntity.ok(couponService.getAll())
    }

    @GetMapping("/{name}")
    fun getCouponByName(@PathVariable name: String): ResponseEntity<Coupon?> {
        return ResponseEntity.ok(couponService.getCouponByName(name))
    }

    @PostMapping("/create")
    fun createEvent(@ModelAttribute couponRequest: CreateCouponRequest, request: HttpServletRequest) : ResponseEntity<Coupon>{
        return ResponseEntity.ok(couponService.createCoupon(couponRequest))
    }

    @DeleteMapping("/remove/{name}")
    fun deleteCouponByName(@PathVariable name: String): ResponseEntity<Any> {
        return ResponseEntity.ok(couponService.deleteCoupon(name))
    }
}