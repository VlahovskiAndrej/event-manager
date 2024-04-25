package com.sorsix.eventmanager.api

import com.sorsix.eventmanager.config.AuthService
import com.sorsix.eventmanager.domain.request.LoginRequest
import com.sorsix.eventmanager.domain.request.RegisterRequest
import com.sorsix.eventmanager.domain.response.AuthResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
class AuthController(
    val authService: AuthService
) {

    @PostMapping("/register")
    fun register(@RequestBody registerRequest: RegisterRequest) : ResponseEntity<AuthResponse>{
        return ResponseEntity.ok(authService.register(registerRequest))
    }

    @PostMapping("/login")
    fun login(@RequestBody loginRequest: LoginRequest) : ResponseEntity<AuthResponse>{
        return ResponseEntity.ok(authService.login(loginRequest))
    }
}