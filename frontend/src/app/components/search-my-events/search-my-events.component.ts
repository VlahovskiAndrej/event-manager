import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { EventInterface } from '../../interfaces/event';
import { EventMyComponent } from '../event-my/event-my.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-search-my-events',
  standalone: true,
  imports: [
    EventMyComponent,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './search-my-events.component.html',
  styleUrl: './search-my-events.component.css'
})
export class SearchMyEventsComponent {
  events: EventInterface[] | undefined;
  query$: Subject<string> = new Subject();
  loading: boolean = false;

  constructor(private eventService: EventService){}

  ngOnInit(): void {
    this.eventService.getMyEvents()
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
