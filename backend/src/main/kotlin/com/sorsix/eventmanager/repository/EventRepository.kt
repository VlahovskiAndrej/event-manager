package com.sorsix.eventmanager.repository

import com.sorsix.eventmanager.domain.Category
import com.sorsix.eventmanager.domain.Event
import com.sorsix.eventmanager.domain.user.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.time.LocalDate

@Repository
interface EventRepository : JpaRepository<Event, Long>{
    fun findAllByNameContainingIgnoreCase(query : String) : List<Event>
    fun findAllByDateStartAfter(date : LocalDate) : List<Event>
    fun findAllByDateFinishBefore(date: LocalDate) : List<Event>
    fun findAllByDateStartAfterAndDateFinishBefore(started: LocalDate, finished: LocalDate) : List<Event>
    fun findEventsByCreator(creator: User?): List<Event>
    fun findAllEventsByCategory(category : Category) : List<Event>

    @Query("select distinct e.category from Event e")
    fun findAllCategories() : List<Category>

    @Query("select distinct e from Event e where e != :ev order by e.dateStart, e.timeStart limit 3")
    fun getRelatedEvents(ev: Event): List<Event>

}