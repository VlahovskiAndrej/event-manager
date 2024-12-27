package com.sorsix.eventmanager.repository

import com.sorsix.eventmanager.domain.Event
import com.sorsix.eventmanager.domain.Image
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

@Repository
interface ImageRepository: JpaRepository<Image, Long>{

//    @Query("select i from Image where i != :event")
//    fun findAllByEvent(event: Event): List<Image>

    @Transactional(readOnly = true)
    @Query("SELECT img FROM Image img WHERE img.event.id = :eventId")
    fun findImagesByEventId(@Param("eventId") eventId: Long): List<Image>
}
