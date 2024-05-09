package com.sorsix.eventmanager.service

import com.sorsix.eventmanager.domain.Event
import com.sorsix.eventmanager.domain.Image
import com.sorsix.eventmanager.domain.Thumbnail

interface ImageService{
    fun saveImage(event: Event, name: String, contentType: String, data: ByteArray): Image

    fun findAllByEvent(id: Long): List<Image>
}
