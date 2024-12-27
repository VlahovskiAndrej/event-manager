package com.sorsix.eventmanager.service

import com.sorsix.eventmanager.domain.Tag

interface TagService {

    fun createTag(name: String): Tag;
}