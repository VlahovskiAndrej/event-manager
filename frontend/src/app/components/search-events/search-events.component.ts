import { Component, Input } from '@angular/core';
import { EventService } from '../../services/event.service';
import { BehaviorSubject, Subject, debounceTime, distinctUntilChanged, mergeMap, switchMap, tap } from 'rxjs';
import { EventInterface } from '../../interfaces/event';
import { EventComponent } from '../event/event.component';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { } from 'mdb-angular-ui-kit/'
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
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    RouterOutlet,
    RouterLink
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './search-events.component.html',
  styleUrl: './search-events.component.css'
})
export class SearchEventsComponent {

  cities: any[] = [
    { value: 'skopje', viewValue: 'Skopje' },
    { value: 'tetovo', viewValue: 'Tetovo' },
    { value: 'veles', viewValue: 'Veles' },
  ];

  events: EventInterface[] | undefined;
  recentEvents: EventInterface[] | undefined;
  allEvents: EventInterface[] | undefined;

  categories: string[] | undefined;
  selectedCategories: string[] = [];

  query$: Subject<string> = new Subject();

  //ako ne filtrirame od backend za kategorii moze da se izbrise ova
  category$ = new BehaviorSubject<string | null>(null);

  date$ = new BehaviorSubject<any>("");

  loading: boolean = true;

  //clicked: boolean = false;


  constructor(private eventService: EventService) { }

  ngOnInit(): void {

    this.eventService.getEvents()
      .subscribe(
        events => {
          this.events = events.sort((a, b) => (a.category.localeCompare(b.category)))
          this.allEvents = events.sort((a, b) => (a.category.localeCompare(b.category)))
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
        categories => {
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

    this.date$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((date) => this.eventService.filterByDate(date))
    ).subscribe(
      result => {
        this.events = result
        this.loading = false
      }
    )

    // this.category$.pipe(
    //   debounceTime(400),
    //   distinctUntilChanged(),
    //   switchMap(category => this.eventService.filterByCategory(category!!))
    //   ).subscribe(
    //     result => {
    //       this.events = result
    //       this.loading = false
    //       //this.clicked = true
    //     }
    // );

  }

  search(query: string) {
    this.query$.next(query);
  }

  // filterByCategory(category: string){
  //   if(this.category$.value === category){
  //     // this.clicked = false
  //      this.events = this.allEvents
  //   }
  //   else {
  //     this.category$.next(category)
  //   }
  // }

  filterByCategory(category: string) {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    } else {
      this.selectedCategories.push(category);
    }

    if (this.selectedCategories.length === 0) {
      this.events = this.allEvents
    }
    else {
      this.events = this.allEvents?.filter(event =>
        this.selectedCategories.includes(event.category)
      )
    }
  }

  filterByDate(date: any) {
    if (!date || !date._model || !date._model.selection) {
      console.error("Invalid date object:", date);
      return; // Handle the error appropriately
    }

    const returned: string[] = [date._model.selection.start,date._model.selection.end]

    // console.log(date._model.selection.start)
    // console.log(date)
    // console.log(date._model.selection.end)
    // console.log(returned)
    this.date$.next(returned)
  }

  //TODO
  applyCombinedFilter(events: EventInterface[]) {

  }


}
