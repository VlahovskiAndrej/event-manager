package com.sorsix.eventmanager.repository

import com.sorsix.eventmanager.domain.user.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<User, Long>{

    fun findByEmail(email : String) : User?

}