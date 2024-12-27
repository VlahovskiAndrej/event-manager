import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { UpdateEventComponent } from '../update-event/update-event.component';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { EventStatsComponent } from '../event-stats/event-stats.component';
import { Chart } from 'chart.js';
import { AddTicketsComponent } from '../add-tickets/add-tickets.component';
import { AddCouponsComponent } from '../add-coupons/add-coupons.component';

@Component({
  selector: 'app-event-my-details',
  standalone: true,
  imports: [
    MatTabsModule,
     MatIconModule,
     UpdateEventComponent,
     EventDetailsComponent,
     EventStatsComponent,
     AddTicketsComponent,
     AddCouponsComponent
  ],
  templateUrl: './event-my-details.component.html',
  styleUrl: './event-my-details.component.css'
})
export class EventMyDetailsComponent {
  activeTabIndex = 0; // Default active tab index

  tabChanged(event: any): void {
    this.activeTabIndex = event.index; // Update active tab index
  }
}
