package com.sorsix.eventmanager.config

import com.sorsix.eventmanager.domain.request.LoginRequest
import com.sorsix.eventmanager.domain.request.RegisterRequest
import com.sorsix.eventmanager.domain.response.AuthResponse
import com.sorsix.eventmanager.domain.user.Role
import com.sorsix.eventmanager.domain.user.User
import com.sorsix.eventmanager.repository.UserRepository
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import kotlin.math.log

@Service
class AuthService(
    val userRepository: UserRepository,
    val passwordEncoder: PasswordEncoder,
    val jwtService: JwtService,
    val authenticationManager: AuthenticationManager
) {

    fun register(registerRequest: RegisterRequest): AuthResponse{
        val user: User = User(
            0,
            registerRequest.firstName,
            registerRequest.lastName,
            registerRequest.email.lowercase(),
            passwordEncoder.encode(registerRequest.password),
            Role.USER
        )
        val savedUser = userRepository.save(user);
        val jwtToken = jwtService.generateToken(user);
        val refreshToken = jwtService.generateToken(user);
        return AuthResponse(jwtToken)
    }

    fun login(loginRequest: LoginRequest): AuthResponse{
        authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(
                loginRequest.email,
                loginRequest.password
            )
        )
        val user: UserDetails = userRepository.findByEmail(loginRequest.email)!!
        val jwtToken = jwtService.generateToken(user)
        return AuthResponse(jwtToken)
    }
}