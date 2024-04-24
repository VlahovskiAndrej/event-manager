import { Component, Input } from '@angular/core';
import { EventInterface } from '../../interfaces/event';
import {MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    MatCardModule,
    MatButton
  ],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {
  @Input() event: EventInterface | undefined;
}
