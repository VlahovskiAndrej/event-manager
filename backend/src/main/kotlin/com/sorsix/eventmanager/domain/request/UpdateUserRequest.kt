package com.sorsix.eventmanager.domain.request

data class UpdateUserRequest(
    val firstName: String,
    val lastName: String,
    val currentPassword: String,
    val newPassword: String,
    val email: String
)
