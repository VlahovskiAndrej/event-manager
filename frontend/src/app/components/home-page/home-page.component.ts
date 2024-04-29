import { Component, OnInit } from '@angular/core';
import { BestReviewedEventsComponent } from '../best-reviewed-events/best-reviewed-events.component';
import { EventInterface } from '../../interfaces/event';
import { EventService } from '../../services/event.service';
import { FrontPageComponent } from '../front-page/front-page.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BestReviewedEventsComponent,FrontPageComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  bestEvents : EventInterface[] | undefined;
  loading : Boolean = false;

  constructor(private eventService : EventService){}

  ngOnInit(): void {
    this.eventService.getEvents()
    .subscribe(events => {
      this.bestEvents = events
      this.loading = false;
      console.log(events)
    });
  }

  //povik do api so best reviewed events

}
