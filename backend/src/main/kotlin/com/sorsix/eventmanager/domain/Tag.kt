package com.sorsix.eventmanager.domain

import jakarta.persistence.Entity
import jakarta.persistence.Id

@Entity
data class Tag (
    @Id
    val name: String
){
}