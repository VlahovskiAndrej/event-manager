import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { EventService } from '../../services/event.service';
import { BehaviorSubject, Subject, combineLatest, debounceTime, distinctUntilChanged, mergeMap, switchMap, tap } from 'rxjs';
import { EventInterface } from '../../interfaces/event';
import { EventComponent } from '../event/event.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { } from 'mdb-angular-ui-kit/'
import { NgFor } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import {  RouterLink, RouterOutlet } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';

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
    MatPaginator,
    MatSelectModule,
    RouterOutlet,
    RouterLink,
    MatExpansionModule
    ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './search-events.component.html',
  styleUrls: ['./search-events.component.css']
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

  date$ = new BehaviorSubject<any>("");

  dateFilter: boolean = false;
  loading: boolean = true;

  pageEvent: PageEvent | undefined;



  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('startDateInput') startDateInput!: ElementRef<HTMLInputElement>;
  @ViewChild('endDateInput') endDateInput!: ElementRef<HTMLInputElement>;
  @ViewChild('date') dateInput!: ElementRef<HTMLInputElement>;


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
        }
      )

    combineLatest([this.query$, this.date$]).pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(([query, date]) =>
        this.eventService.getFilteredResults(
          query,
          date,
          this.selectedCategories
        )
      )
    ).subscribe(
      result => {
        this.events = result;
        this.loading = false;
      }
    );
  }

  search(query: string) {
    this.query$.next(query);
  }

  filterByCategory(category: string) {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    } else {
      this.selectedCategories.push(category);
    }
    if (this.selectedCategories.includes("ALL"))
      this.selectedCategories = this.selectedCategories.filter(c => c !== "ALL");

    this.updateFilteredResults();
  }

  updateFilteredResults() {
    this.loading = true;
    this.query$.next(this.query$.toString())
  }

  filterByDate(date: any) {
    const returned: string[] = [date._model.selection.start, date._model.selection.end]
    console.log("raboti")
    console.log(returned)
    this.date$.next(returned);
  }

  clearFilter() {

    this.searchInput.nativeElement.value = '';
    this.searchInput.nativeElement.placeholder='Search...';

      this.startDateInput.nativeElement.value = '';
      this.endDateInput.nativeElement.value = '';

    this.date$.next("");

    this.selectedCategories = [];

    this.filterByCategory("ALL");

  }



}
