import { Component, Input } from '@angular/core';
import { EventService } from '../../services/event.service';
import { BehaviorSubject, Subject, combineLatest, debounceTime, distinctUntilChanged, mergeMap, switchMap, tap } from 'rxjs';
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
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
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

  date$ = new BehaviorSubject<any>("");

  loading: boolean = true;

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
    this.date$.next(returned);
  }

  // TODO
  applyCombinedFilter(events: EventInterface[]) {

  }


}
