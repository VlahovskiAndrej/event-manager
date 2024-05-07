package com.sorsix.eventmanager.domain.request

import org.springframework.web.multipart.MultipartFile

data class ThumbnailRequest(
    val file: MultipartFile
)
