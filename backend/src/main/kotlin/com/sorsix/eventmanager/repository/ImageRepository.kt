package com.sorsix.eventmanager.repository

import com.sorsix.eventmanager.domain.Image
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ImageRepository : JpaRepository<Image, Long>