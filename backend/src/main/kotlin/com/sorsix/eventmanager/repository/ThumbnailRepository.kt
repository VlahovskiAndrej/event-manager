package com.sorsix.eventmanager.repository

import com.sorsix.eventmanager.domain.Thumbnail
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ThumbnailRepository : JpaRepository<Thumbnail, Long>