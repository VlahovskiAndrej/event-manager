package com.sorsix.eventmanager.domain.wrapper

import com.sorsix.eventmanager.domain.Category

sealed class CategoryInput {
    data class CategoryList(val categories: List<Category>) : CategoryInput()
    data class AllCategories(val all: String) : CategoryInput()
}