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
}
