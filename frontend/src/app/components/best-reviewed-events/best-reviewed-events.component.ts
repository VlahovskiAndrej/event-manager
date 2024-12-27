import { Component, OnInit } from '@angular/core';
import { EventComponent } from '../event/event.component';
import { EventInterface } from '../../interfaces/event';
import { EventService } from '../../services/event.service';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { last } from 'rxjs';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-best-reviewed-events',
  standalone: true,
  imports: [EventComponent,NgbCarouselModule,RouterLink],
  templateUrl: './best-reviewed-events.component.html',
  styleUrl: './best-reviewed-events.component.css'
})
export class BestReviewedEventsComponent implements OnInit{

  events: EventInterface[] | undefined;
  loading: boolean = false;

  currentSlideIndex=0;


  constructor(private eventService: EventService){}

  ngOnInit(): void {
    this.eventService.getEvents()
    .subscribe(events => {
      this.events = events
      this.loading = false;
      console.log(events)
    });
  }



}


