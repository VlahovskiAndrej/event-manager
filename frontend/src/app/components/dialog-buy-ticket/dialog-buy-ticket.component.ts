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
import {MatInputModule} from '@angular/material/input';
import { UpperCasePipe } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';



@Component({
  selector: 'app-dialog-buy-ticket',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
     MatDialogTitle,
     MatDialogContent,
     MatInputModule,
     UpperCasePipe,
     MatFormFieldModule,
     MatIcon
    ],
  templateUrl: './dialog-buy-ticket.component.html',
  styleUrl: './dialog-buy-ticket.component.css'
})
export class DialogBuyTicketComponent implements OnInit{

  event: EventInterface|undefined
  price: number = 0
  discountPrice = 0
  numberOfTickets = 1
  errorCoupon: string = ""

  constructor(private route: ActivatedRoute, private eventService: EventService, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
    this.eventService.getEventById(this.data.id).subscribe(
      e => {
        this.event = e
        this.price = e.price
      }
    )
  }

  buyTicket(){
    // console.log(this.data)
    this.eventService.buyTicket(this.data.id).subscribe(
      e => this.event = e
    )
    this.dialog.closeAll()
  }


  onChangeCoupon(value: string){
    if (this.event?.price != undefined && value.toUpperCase() == 'ANDREJ10'){
      this.discountPrice = 10
      this.price = this.event?.price!! - this.discountPrice
      this.errorCoupon = ""
    }
    else{
      this.price = this.event?.price!!
      this.discountPrice = 0
      this.errorCoupon = "Invalid coupon name!"
    }

  }

  onChangeNumberOfTickets(value: string){
    if (value != "")
      this.numberOfTickets = Number.parseInt(value)
    else
      this.numberOfTickets = 0
  }
}
