import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../interfaces/ticket';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import {MatIcon, MatIconModule} from '@angular/material/icon';



export interface TicketInTable {
  id: number,
  price: number,
  event: string,
  buyer: string
}

@Component({
  selector: 'app-search-tickets',
  standalone: true,
  imports: [
    MatTableModule,
    // MatSortModule,
    MatPaginatorModule,
    MatIcon
  ],
  templateUrl: './search-tickets.component.html',
  styleUrl: './search-tickets.component.css'
})
export class SearchTicketsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'price', 'event', 'buyer', 'date', 'status', 'pdf'];
  dataSource: any;
  tickets: Ticket[] | undefined;
  ticketsInTable: TicketInTable[] = []

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getTicketsByUserId()
      .subscribe(tickets => {
        this.tickets = tickets

        for (let t of tickets){
          this.ticketsInTable.push({
            id: t.id,
            price: t.price,
            event: t.event.name.toString(),
            buyer: t.buyer.username.toString()
          })
        }

        // this.dataSource = new MatTableDataSource<TicketInTable>(this.ticketsInTable);
        this.dataSource = new MatTableDataSource<Ticket>(this.tickets);

      });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onClickDownload(ticket: TicketInTable){
    console.log("Download ticket with ID: " + ticket.id)
  }


}
