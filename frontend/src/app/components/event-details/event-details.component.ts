import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventInterface } from '../../interfaces/event';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {MatDialogModule,   MatDialog,
  MatDialogRef} from '@angular/material/dialog';
import { DialogBuyTicketComponent } from '../dialog-buy-ticket/dialog-buy-ticket.component';
import { MapComponent } from '../create-event-map/map.component';


@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatButton,
    MatDialogModule,
    MapComponent
  ],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit{

  event: EventInterface|null = null
  id: string|undefined

  constructor(private route: ActivatedRoute, private eventService: EventService, public dialog: MatDialog){}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.eventService.getEventById(id).subscribe(
      (e) => {
        this.event = e
      }
    )
  }

  buyTicketDialog(): void {
    console.log(this.route.snapshot.params['id'])
    this.dialog.open(DialogBuyTicketComponent, { 
      data: {
        id: this.route.snapshot.params['id'],
        
      } 
    }).afterClosed().subscribe(
      () => this.ngOnInit()
    )
  }

}