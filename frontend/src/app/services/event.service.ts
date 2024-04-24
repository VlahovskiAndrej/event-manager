import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventInterface } from '../interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getEvents() : Observable<EventInterface[]>{
    return this.http.get<EventInterface[]>(`http://localhost:8080/api/events`)
  }
}
