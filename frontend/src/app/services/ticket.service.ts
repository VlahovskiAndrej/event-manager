import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ticket } from '../interfaces/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  getAllTickets(){

  }

  getTicketsByEventId(){
    
  }

  getTicketsByUserId() : Observable<Ticket[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get<Ticket[]>(`http://localhost:8081/api/tickets?userId=1`, { headers: headers })
  }
}
