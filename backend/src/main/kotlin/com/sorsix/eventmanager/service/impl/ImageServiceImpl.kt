package com.sorsix.eventmanager.service.impl

import com.sorsix.eventmanager.domain.Image
import com.sorsix.eventmanager.repository.ImageRepository
import com.sorsix.eventmanager.service.ImageService
import org.springframework.stereotype.Service

@Service
class ImageServiceImpl(
    private val imageRepository: ImageRepository
) : ImageService {

    override fun saveImage(name: String, contentType: String, data: ByteArray): Image {
        val imageEntity = Image(name = name, contentType = contentType, data = data)
        return imageRepository.save(imageEntity)
    }

    override fun getImageById(id: Long): Image? {
        return imageRepository.findById(id).orElse(null)

    }


}