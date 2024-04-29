import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { EventInterface } from '../../interfaces/event';
import { EventComponent } from '../event/event.component';
import {MatChipsModule} from '@angular/material/chips';


import {} from 'mdb-angular-ui-kit/'
@Component({
  selector: 'app-search-events',
  standalone: true,
  imports: [
    EventComponent,
    MatChipsModule
  ],
  templateUrl: './search-events.component.html',
  styleUrl: './search-events.component.css'
})
export class SearchEventsComponent {
  events: EventInterface[] | undefined;
  recentEvents: EventInterface[] | undefined;

  query$: Subject<string> = new Subject();
  loading: boolean = true;
    title = 'mdb-angular-ui-kit-free';

  constructor(private eventService: EventService){}

  ngOnInit(): void {

    this.eventService.getEvents()
    .subscribe(events => {
      this.events = events
      this.loading = false
    });

    this.eventService.getRecentEvents()
    .subscribe(recentEvents =>{
      this.recentEvents = recentEvents
      this.loading=false
    });

    this.query$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(query => this.eventService.search(query))
      ).subscribe(result => {
        this.events= result
        this.loading = false
    });
  }

  search(query: string){
    this.query$.next(query);
  }

}
