package com.sorsix.eventmanager.service

import com.sorsix.eventmanager.domain.Thumbnail

interface ThumbnailService{
    fun saveThumbnail(id: Long, name: String, contentType: String, data: ByteArray): Thumbnail

    fun getThumbnailById(id: Long): Thumbnail?
}