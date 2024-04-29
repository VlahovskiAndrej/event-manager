import { Component, Input, NgModule } from '@angular/core';
import { EventInterface } from '../../interfaces/event';
import {MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import { CustomDatePipe } from '../../pipes/custom.datepipe';


@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    MatCardModule,
    MatButton,
    MatChipsModule,
    CustomDatePipe
  ],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})

export class EventComponent {
  @Input() event: EventInterface | undefined;
  @Input() showDetails : boolean = true;

}
