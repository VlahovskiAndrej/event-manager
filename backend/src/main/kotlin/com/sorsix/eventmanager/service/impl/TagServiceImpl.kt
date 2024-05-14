package com.sorsix.eventmanager.service.impl

import com.sorsix.eventmanager.domain.Tag
import com.sorsix.eventmanager.repository.TagRepository
import com.sorsix.eventmanager.service.TagService
import org.springframework.stereotype.Service

@Service
class TagServiceImpl(val tagRepository: TagRepository) : TagService{
    override fun createTag(name: String): Tag {
        val tag = tagRepository.findById(name)
        return if (tag.isEmpty)
            tagRepository.save(Tag(name))
        else
            tag.get()
    }
}