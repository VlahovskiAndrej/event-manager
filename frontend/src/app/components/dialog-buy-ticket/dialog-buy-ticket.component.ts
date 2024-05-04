import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventInterface } from '../../interfaces/event';

@Component({
  selector: 'app-dialog-buy-ticket',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatDialogActions, 
    MatDialogClose,
     MatDialogTitle, 
     MatDialogContent,
    ],
  templateUrl: './dialog-buy-ticket.component.html',
  styleUrl: './dialog-buy-ticket.component.css'
})
export class DialogBuyTicketComponent{

  event: EventInterface|undefined 

  constructor(private route: ActivatedRoute, private eventService: EventService, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  buyTicket(){
    // console.log(this.data)
    this.eventService.buyTicket(this.data.id).subscribe(
      e => this.event = e
    )
    this.dialog.closeAll()
  }
}
