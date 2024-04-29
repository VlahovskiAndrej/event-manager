import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../interfaces/ticket';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-search-tickets',
  standalone: true,
  imports: [
    MatTableModule
  ],
  templateUrl: './search-tickets.component.html',
  styleUrl: './search-tickets.component.css'
})
export class SearchTicketsComponent implements OnInit {
  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-weight', 'demo-symbol'];
  dataSource: Ticket[]|undefined = undefined;
  tickets: Ticket[] | undefined;

  constructor(private ticketService: TicketService){}

  ngOnInit(): void {
    this.ticketService.getTicketsByUserId()
      .subscribe(tickets => {
        this.tickets = tickets
        this.dataSource = tickets
        console.log(tickets)
      });
  }
}
