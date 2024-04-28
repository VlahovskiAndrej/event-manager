import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventInterface } from '../interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getEvents() : Observable<EventInterface[]>{
    return this.http.get<EventInterface[]>(`http://localhost:8080/api/events`)
  }

  createEvent(name: string, 
              description: string, 
              longitude: string, 
              latitude: string, 
              category: string, 
              tagNames: string[], 
              dateStart: string,
              dateFinish: string
              ) : Observable<EventInterface[]>{
    const body = {
      name: name,
      description: description,
      maxPeople: 0,
      longitude: longitude,
      latitude: latitude,
      category: category,
      tagsNames: tagNames,
      dateStart: dateStart,
      dateFinish: dateFinish,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.post<EventInterface[]>(`http://localhost:8080/api/events/create`, body, { headers: headers })
  }

  updateEvent(
    id: string,
    name: string, 
    description: string, 
    longitude: string, 
    latitude: string, 
    category: string, 
    tagNames: string[], 
    dateStart: string,
    dateFinish: string
    ) : Observable<EventInterface[]>{
      const body = {
      name: name,
      description: description,
      maxPeople: 0,
      longitude: longitude,
      latitude: latitude,
      category: category,
      tagsNames: tagNames,
      dateStart: dateStart,
      dateFinish: dateFinish,
      };

      const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      });

      return this.http.put<EventInterface[]>(`http://localhost:8080/api/events/${id}/update`, body, { headers: headers })
      }

  getMyEvents() : Observable<EventInterface[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get<EventInterface[]>(`http://localhost:8080/api/events/my-events`, { headers: headers })
  }

  deleteEvent(id: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.delete<EventInterface[]>(`http://localhost:8080/api/events/${id}/delete`, { headers: headers })
  }

  publishTickets(eventId: number, price: string, numberOfTickets: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    const body = {
      eventId: eventId,
      price: price,
      numberOfTickets: numberOfTickets
    };
    return this.http.put<EventInterface[]>(`http://localhost:8080/api/events/publish`, body, { headers: headers })
  }

  getEventById(id: string) : Observable<EventInterface>{
    return this.http.get<EventInterface>(`http://localhost:8080/api/events/${id}`)
  }

}
