package com.sorsix.eventmanager.web

import com.sorsix.eventmanager.domain.Category
import com.sorsix.eventmanager.domain.Event
import com.sorsix.eventmanager.domain.Image
import com.sorsix.eventmanager.domain.request.EventRequest
import com.sorsix.eventmanager.domain.request.PublishTicketsRequest
import com.sorsix.eventmanager.domain.request.ThumbnailRequest
import com.sorsix.eventmanager.service.EventService
import com.sorsix.eventmanager.service.ImageService
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDate
import java.time.format.DateTimeFormatter


@RestController
@RequestMapping("/api/events")
@CrossOrigin("*")
class EventController(
    val eventService: EventService,
    val imageService: ImageService
) {

    @GetMapping("")
    fun getAllEvents(): ResponseEntity<List<Event>> {
        return ResponseEntity.ok(eventService.getEvents())
    }

    @GetMapping("/{id}")
    fun getEventById(@PathVariable id: Long): Event? {
        return eventService.getEventById(id)
    }

    @PostMapping("/create")
    fun createEvent(@RequestBody eventRequest: EventRequest, request: HttpServletRequest): ResponseEntity<Event> {
        return ResponseEntity.ok(eventService.createEvent(eventRequest, request))
    }

    @PostMapping("/upload")
//    fun uploadImage(@RequestParam("file") file: MultipartFile): ResponseEntity<String> {
    fun uploadImage(@ModelAttribute req: ThumbnailRequest): ResponseEntity<String> {
        val imageName: String = req.file.originalFilename ?: "image"
        val contentType: String = req.file.contentType ?: "image/jpeg"
        val imageData: ByteArray = req.file.bytes
        val savedImage = imageService.saveImage(imageName, contentType, imageData)
        return ResponseEntity.ok("${savedImage.id}")
    }

    @GetMapping("/image/{id}")
    fun getImageById(@PathVariable id: Long): ResponseEntity<Any> {
        val image: Image? = imageService.getImageById(id)
        if (image != null) {
            val headers: HttpHeaders = HttpHeaders()
            headers.contentType = (MediaType.parseMediaType(image.contentType))
            return ResponseEntity<Any>(image.data, headers, HttpStatus.OK)
        } else {
            return ResponseEntity(HttpStatus.NOT_FOUND)
        }
    }


    @DeleteMapping("/{id}/delete")
    fun deleteEventById(@PathVariable id: Long): ResponseEntity<Any> {
        return ResponseEntity.ok(eventService.deleteEvent(id))
    }

    @PutMapping("/{id}/update")
    fun updateEventById(@PathVariable id: Long, @RequestBody eventRequest: EventRequest): ResponseEntity<Any> {
        return ResponseEntity.ok(eventService.updateEvent(id, eventRequest))
    }

    @PutMapping("/publish")
    fun publishTicketsForEventId(
        @RequestBody publishTicketsRequest: PublishTicketsRequest
    ): ResponseEntity<Any> {
        return ResponseEntity.ok(eventService.publishTicketsForEventId(publishTicketsRequest))
    }

    @PostMapping("/{id}/buy") // ?num=2
    fun buyTicketsForEventId(
        @PathVariable id: Long,
        @RequestParam num: Int = 1,
        request: HttpServletRequest
    ): ResponseEntity<Any> {
        return ResponseEntity.ok(eventService.buyTicket(id, num, request))
    }

    @GetMapping("/my-events")
    fun getEventsByUser(request: HttpServletRequest): ResponseEntity<List<Event>> {
        return ResponseEntity.ok(eventService.getEventsByUser(request))
    }

    @GetMapping("/search")
    fun getSearchResults(@RequestParam query: String): ResponseEntity<List<Event>> {
        return ResponseEntity.ok(eventService.searchEvents(query))
    }

    @GetMapping("/recents")
    fun getRecentlyAddedEvents(): ResponseEntity<List<Event>> {
        return ResponseEntity.ok(eventService.getRecentlyAddedEvents())
    }

    @GetMapping("/categories")
    fun getAllCategories(): ResponseEntity<List<Category>> {
        return ResponseEntity.ok(eventService.getAllCategories())
    }

    @GetMapping("/filteredByCategory")
    fun getEventsByCategory(@RequestParam category: Category): ResponseEntity<List<Event>> {
        return ResponseEntity.ok(eventService.filterByCategory(category))
    }

    @GetMapping("/{id}/related")
    fun getRelatedEvents(@PathVariable id: Long): ResponseEntity<List<Event>> {
        return ResponseEntity.ok(eventService.getRelatedEvents(id))
    }

    @GetMapping("/filteredByDateStarted")
    fun getEventsByDateStarted(@RequestParam started: LocalDate): ResponseEntity<List<Event>> {
        return ResponseEntity.ok(eventService.filterByDateStart(started))
    }

    @GetMapping("/filteredByDateFinished")
    fun getEventsByDateFinished(@RequestParam finished: LocalDate): ResponseEntity<List<Event>> {
        return ResponseEntity.ok(eventService.filterByDateFinish(finished))
    }

    @GetMapping("/filteredByDate")
    fun getEventsByDate(
        @RequestParam started: String,
        @RequestParam finished: String
    ): ResponseEntity<List<Event>> {
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd")

        return ResponseEntity.ok(eventService.filterByDateStartedAndDateFinished(
            LocalDate.parse(started,formatter), LocalDate.parse(finished,formatter)))
    }


}
