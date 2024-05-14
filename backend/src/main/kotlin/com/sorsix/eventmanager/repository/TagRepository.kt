package com.sorsix.eventmanager.repository

import com.sorsix.eventmanager.domain.Tag
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TagRepository : JpaRepository<Tag, String>{
}