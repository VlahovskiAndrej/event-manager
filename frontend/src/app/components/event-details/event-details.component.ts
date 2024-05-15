import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventInterface } from '../../interfaces/event';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule, MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { DialogBuyTicketComponent } from '../dialog-buy-ticket/dialog-buy-ticket.component';
import { MapComponent } from '../create-event-map/map.component';
import { EventDetailsMapComponent } from '../event-details-map/event-details-map.component';
import { EventComponent } from '../event/event.component';
import { ImageGalleryComponent } from '../image-galery/image-galery.component';
import { CustomDatePipe } from "../../pipes/custom.datepipe";
import { CustomDatePipeDetails } from "../../pipes/custom.datepipedetails";
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-event-details',
  standalone: true,
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css',
  imports: [
    RouterOutlet,
    RouterLink,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatButton,
    MatDialogModule,
    MapComponent,
    EventDetailsMapComponent,
    EventComponent,
    ImageGalleryComponent,
    CustomDatePipe,
    CustomDatePipeDetails,
    DatePipe
  ]
})
export class EventDetailsComponent implements OnInit {

  event: EventInterface | null = null
  relatedEvents: EventInterface[] = []
  thumbnail: File | null = null
  thumbnailUrl: any
  imagesUrl: any[] = []
  id: string | undefined
  hasMoreImages = true

  constructor(private route: ActivatedRoute, private eventService: EventService, public dialog: MatDialog) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.eventService.getEventById(id).subscribe(
      (e) => {
        this.event = e
      }
    )

    this.eventService.getRelatedEvents(id).subscribe(
      (e) => this.relatedEvents = e
    )

    this.eventService.getThumbnail(id).subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'image/jpeg' });
        this.thumbnailUrl = URL.createObjectURL(blob)
        this.imagesUrl.push(this.thumbnailUrl)
      },
    )

    for (let i = 0; i < 5; i++)
      this.eventService.getImages(id, i).subscribe({
        next: (response: any) => {
          const blob = new Blob([response], { type: 'image/jpeg' });
          this.imagesUrl.push(URL.createObjectURL(blob))
        },
        error: (e: any) => {
          () => console.log("greska")
        }
      })
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
