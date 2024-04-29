package com.sorsix.eventmanager.repository

import com.sorsix.eventmanager.domain.Event
import com.sorsix.eventmanager.domain.user.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

@Repository
interface EventRepository : JpaRepository<Event, Long>{
    fun findAllByNameContainingIgnoreCase(query : String) : List<Event>
    fun findAllByDateStartAfter(date : LocalDateTime) : List<Event>
    fun findEventsByCreator(creator: User?): List<Event>
}