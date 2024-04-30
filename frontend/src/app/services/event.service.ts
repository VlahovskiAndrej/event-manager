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
    return this.http.get<EventInterface[]>(`http://localhost:8081/api/events`)
  }

  getRecentEvents() : Observable<EventInterface[]>{
    return this.http.get<EventInterface[]>(`http://localhost:8081/api/events/recents`)
  }

  search(query : string) : Observable<EventInterface[]>{
    return this.http.get<EventInterface[]>(`http://localhost:8081/api/events/search?query=${query}`)
  }

  filterByCategory(category : string) : Observable<EventInterface[]>{
    if(category==null) return this.getEvents()
    return this.http.get<EventInterface[]>(`http://localhost:8081/api/events/filteredByCategory?category=${category}`)
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

    return this.http.post<EventInterface[]>(`http://localhost:8081/api/events/create`, body, { headers: headers })
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

      return this.http.put<EventInterface[]>(`http://localhost:8081/api/events/${id}/update`, body, { headers: headers })
      }

  getMyEvents() : Observable<EventInterface[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get<EventInterface[]>(`http://localhost:8081/api/events/my-events`, { headers: headers })
  }

  deleteEvent(id: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.delete<EventInterface[]>(`http://localhost:8081/api/events/${id}/delete`, { headers: headers })
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
    return this.http.put<EventInterface[]>(`http://localhost:8081/api/events/publish`, body, { headers: headers })
  }

  getEventById(id: string) : Observable<EventInterface>{
    return this.http.get<EventInterface>(`http://localhost:8081/api/events/${id}`)
  }

  buyTicket(id: number | undefined) : Observable<EventInterface>{
    const numberOfTickets = 1

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    const body = {};

    return this.http.post<EventInterface>(`http://localhost:8081/api/events/${id}/buy?num=${numberOfTickets}`, body, { headers: headers })
  }

  getEventCategories() : Observable<string[]>{
    return this.http.get<string[]>(`http://localhost:8081/api/events/categories`)
  }


}
