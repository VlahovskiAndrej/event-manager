package com.sorsix.eventmanager.config

import com.sorsix.eventmanager.domain.request.LoginRequest
import com.sorsix.eventmanager.domain.request.RegisterRequest
import com.sorsix.eventmanager.domain.request.UpdateUserRequest
import com.sorsix.eventmanager.domain.response.AuthResponse
import com.sorsix.eventmanager.domain.user.Role
import com.sorsix.eventmanager.domain.user.User
import com.sorsix.eventmanager.repository.UserRepository
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.HttpHeaders
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.ModelAttribute
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

        if (user.firstName == "" || user.lastName == "" || user.username == "" || registerRequest.password == "")
            throw Exception("Invalid input data for creating username!")

        val savedUser = userRepository.save(user);
        val jwtToken = jwtService.generateToken(user);
        return AuthResponse(jwtToken, savedUser.username)
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
        return AuthResponse(jwtToken, user.username)
    }

    fun getUserByJwtToken(request: HttpServletRequest): User? {
        val authHeader = request.getHeader(HttpHeaders.AUTHORIZATION).substring(7)
        val username: String = jwtService.extractUsername(authHeader)
        val user: User? =  userRepository.findByEmail(username)
        return user
    }

    fun updateUser(updateUserRequest: UpdateUserRequest, request: HttpServletRequest): User? {
        val user: User? = getUserByJwtToken(request)

        if (updateUserRequest.currentPassword != ""){
            authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(
                    updateUserRequest.email,
                    updateUserRequest.currentPassword
                )
            )
            user?.changePassword(passwordEncoder.encode(updateUserRequest.newPassword))
        }

        if (user != null){
            user.firstName = updateUserRequest.firstName
            user.lastName = updateUserRequest.lastName

            return userRepository.save(user)
        }

        return null
    }

    fun removeUser(request: HttpServletRequest): Unit{
        val user: User? = getUserByJwtToken(request)
        if (user != null){
            user.deleteUser()
            userRepository.save(user)
        }

//            userRepository.deleteById(user.id)
    }
}