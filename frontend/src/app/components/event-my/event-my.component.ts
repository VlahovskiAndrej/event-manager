import { Component, Input } from '@angular/core';
import { EventInterface } from '../../interfaces/event';
import {MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import { EventService } from '../../services/event.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-event-my',
  standalone: true,
  imports: [
    MatCardModule,
    MatButton,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './event-my.component.html',
  styleUrl: './event-my.component.css'
})
export class EventMyComponent {
  @Input() event: EventInterface | undefined;

  constructor(private eventService: EventService){}

  onDeleteEvent(id: number){
    this.eventService.deleteEvent(id).subscribe(
      () => location.href = 'events/my-events'
    )
  }

  onPublishTickets(numTickets: string, price: string){
    this.eventService.publishTickets(this.event?.id!!, price, numTickets).subscribe(
      () => location.href = 'events/my-events'
    )
  }

}
