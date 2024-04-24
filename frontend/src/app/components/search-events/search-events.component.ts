import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { EventInterface } from '../../interfaces/event';
import { EventComponent } from '../event/event.component';

@Component({
  selector: 'app-search-events',
  standalone: true,
  imports: [
    EventComponent
  ],
  templateUrl: './search-events.component.html',
  styleUrl: './search-events.component.css'
})
export class SearchEventsComponent {
  events: EventInterface[] | undefined;
  query$: Subject<string> = new Subject();
  loading: boolean = false;

  constructor(private eventService: EventService){}

  ngOnInit(): void {
    this.eventService.getEvents()
    .subscribe(events => {
      this.events = events
      this.loading = false;
      console.log(events)
    });
  }

  search(query: string){
    this.query$.next(query);
  }

}
