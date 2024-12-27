import { Component, Input, OnInit } from '@angular/core';
import { EventInterface } from '../../interfaces/event';
import { EventService } from '../../services/event.service';
import { CustomDatePipe } from '../../pipes/custom.datepipe';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-near-me-event',
  standalone: true,
  imports: [CustomDatePipe, MatIconModule],
  templateUrl: './near-me-event.component.html',
  styleUrl: './near-me-event.component.css'
})
export class NearMeEventComponent implements OnInit{
  @Input() event: EventInterface|undefined
  @Input() distance: string|undefined
  showDistance: string|undefined
  thumbnailUrl: string|undefined

  constructor(private eventService: EventService){}

  ngOnInit(): void {
    this.eventService.getThumbnail(this.event?.id!!).subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'image/jpeg' });
        this.thumbnailUrl = URL.createObjectURL(blob)
      }
    )
  }


  reformatDistance(distance: string){
    if(Number.parseFloat(this.distance!!) > 1)
      return this.distance + " km."
    
    return Number.parseFloat(this.distance!!) * 1000 + " m."
  }

}
