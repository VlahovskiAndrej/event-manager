package com.sorsix.eventmanager.service

import com.sorsix.eventmanager.domain.Image

interface ImageService{
    fun saveImage(name: String, contentType: String, data: ByteArray): Image

    fun getImageById(id: Long): Image?
}