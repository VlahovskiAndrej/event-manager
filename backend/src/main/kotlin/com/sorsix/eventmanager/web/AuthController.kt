package com.sorsix.eventmanager.web

import com.sorsix.eventmanager.config.AuthService
import com.sorsix.eventmanager.domain.request.LoginRequest
import com.sorsix.eventmanager.domain.request.RegisterRequest
import com.sorsix.eventmanager.domain.response.AuthResponse
import com.sorsix.eventmanager.domain.user.User
import jakarta.servlet.http.HttpServletRequest
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

    @GetMapping("/user-details")
    fun getUserByJwtToken(request: HttpServletRequest) : ResponseEntity<User>{
       return ResponseEntity.ok(authService.getUserByJwtToken(request))
    }
}