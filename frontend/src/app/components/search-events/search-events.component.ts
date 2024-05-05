import { Component, Input } from '@angular/core';
import { EventService } from '../../services/event.service';
import { BehaviorSubject, Subject, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { EventInterface } from '../../interfaces/event';
import { EventComponent } from '../event/event.component';
import {MatChipsModule} from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';

import {} from 'mdb-angular-ui-kit/'
import { NgFor } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-search-events',
  standalone: true,
  imports: [
    NgFor,
    EventComponent,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    RouterOutlet,
    RouterLink,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './search-events.component.html',
  styleUrl: './search-events.component.css'
})
export class SearchEventsComponent {

  cities: any[] = [
    {value: 'skopje', viewValue: 'Skopje'},
    {value: 'tetovo', viewValue: 'Tetovo'},
    {value: 'veles', viewValue: 'Veles'},
  ];

  events: EventInterface[] | undefined;
  recentEvents: EventInterface[] | undefined;
  allEvents: EventInterface[] | undefined;
  categories: string[] | undefined;

  query$: Subject<string> = new Subject();
  category$ = new BehaviorSubject<string | null>(null);

  loading: boolean = true;

  clicked: boolean = false;

  constructor(private eventService: EventService){}

  ngOnInit(): void {

    this.eventService.getEvents()
    .subscribe(
      events => {
        this.events = events
        this.allEvents = events
        this.loading = false
      }
    );

    this.eventService.getRecentEvents()
    .subscribe(
      recentEvents => {
        this.recentEvents = recentEvents
        this.loading = false
      }
    );

    this.eventService.getEventCategories()
    .subscribe(
      categories =>{
          this.categories = categories
          console.log(categories)
      }
    )

    this.query$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(query => this.eventService.search(query))
      ).subscribe(
        result => {
          this.events = result
          this.loading = false
        }
    );

    this.category$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(category => this.eventService.filterByCategory(category!!))
      ).subscribe(
        result => {
          this.events = result
          this.loading = false
          this.clicked = true
        }
    );

  }

  search(query: string){
    this.query$.next(query);
  }

  filterByCategory(category: string){
    console.log(this.clicked)
    if(this.category$.value === category && this.clicked===true){
       this.clicked = false
       this.events = this.allEvents
    }
    else {
      this.category$.next(category)
    }
  }

}
