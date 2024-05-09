package com.sorsix.eventmanager.service.impl

import com.sorsix.eventmanager.domain.Thumbnail
import com.sorsix.eventmanager.repository.ThumbnailRepository
import com.sorsix.eventmanager.service.ThumbnailService
import org.springframework.stereotype.Service

@Service
class ThumbnailServiceImpl(
    private val thumbnailRepository: ThumbnailRepository
) : ThumbnailService {

    override fun saveThumbnail(id: Long, name: String, contentType: String, data: ByteArray): Thumbnail {
        val imageEntity = Thumbnail(id = id, name = name, contentType = contentType, data = data)
        return thumbnailRepository.save(imageEntity)
    }

    override fun getThumbnailById(id: Long): Thumbnail? {
        return thumbnailRepository.findById(id).orElse(null)

    }


}