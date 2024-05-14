import { Component, Input, NgModule, OnInit } from '@angular/core';
import { EventInterface } from '../../interfaces/event';
import {MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import { CustomDatePipe } from '../../pipes/custom.datepipe';
import { EventService } from '../../services/event.service';
import { MatIcon } from '@angular/material/icon';
import { UpperCasePipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';



@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    MatCardModule,
    MatButton,
    MatCommonModule,
    MatIcon,
    MatChipsModule,
    CustomDatePipe,
    UpperCasePipe,
    DatePipe    
  ],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})

export class EventComponent implements OnInit{
  @Input() event: EventInterface | undefined;
  @Input() showDetails : boolean = true;
  thumbnailUrl: any

  today = new Date()

  constructor(private eventService: EventService){}

  ngOnInit(): void {
    this.eventService.getThumbnail(this.event?.id!!).subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'image/jpeg' });
        this.thumbnailUrl = URL.createObjectURL(blob)

      }
    )
  }

  buyTicket(){
    this.eventService.buyTicket(this.event?.id).subscribe(
      e => this.event = e
    )
  }

}
