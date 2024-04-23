package com.sorsix.eventmanager.repository

import com.sorsix.eventmanager.domain.Event
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface EventRepository : JpaRepository<Event, Long>{
}