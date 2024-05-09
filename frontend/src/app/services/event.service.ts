import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventInterface } from '../interfaces/event';
import { Image } from '../interfaces/image';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  url: string = 'http://localhost:8081/api/events'

  constructor(private http: HttpClient) { }

  getEvents(): Observable<EventInterface[]> {
    return this.http.get<EventInterface[]>(`${this.url}`)
  }

  getRecentEvents(): Observable<EventInterface[]> {
    return this.http.get<EventInterface[]>(`${this.url}/recents`)
  }

  search(query: string): Observable<EventInterface[]> {
    return this.http.get<EventInterface[]>(`${this.url}/search?query=${query}`)
  }

  filterByCategory(category: string): Observable<EventInterface[]> {
    if (category == null) return this.getEvents()
    return this.http.get<EventInterface[]>(`${this.url}/filteredByCategory?category=${category}`)
  }

  //prv test dali raboti
  //TODO : eden filter za data

  filterByDateStarted(started: string): Observable<EventInterface[]> {

    return this.http.get<EventInterface[]>(`${this.url}/filteredByDateStarted?started=${started}`)
  }


  filterByDate(date: string[]): Observable<EventInterface[]> {
    if (date === null || !date) return this.getEvents()

    const started : string = this.convertDateFormat(date[0])
    const finished : string = this.convertDateFormat(date[1])

    if (finished === null || finished==="1970-01-01") return this.filterByDateStarted(started)
    return this.http.get<EventInterface[]>(`${this.url}/filteredByDate?started=${started}&finished=${finished}`)
  }

  convertDateFormat(inputDate : string) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }



  getThumbnail(id: number): Observable<Blob>{
    return this.http.get(`http://localhost:8081/api/events/image/${id}`, {
      params: {
        id,
      },
      responseType: 'blob',
    }
)
  }

  uploadThumbnail(formData: FormData){

    const headers = new HttpHeaders({
    //  'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.post<String>(`http://localhost:8081/api/events/upload`, formData, {headers: headers})
  }

  createEvent(
              formData: FormData
              // name: string,
              // description: string,
              // longitude: string,
              // latitude: string,
              // category: string,
              // tagNames: string,
              // dateStart: string,
              // dateFinish: string,
              // timeStart: string,
              // timeFinish: string,
              // meetingUrl: string,
              // type: string,
              // price: number,
              // maxPeople: number,
              // images: Image[],
              // thumbnail: File|null,
              ) : Observable<EventInterface[]>{
    // const body = {
    //   name: name,
    //   description: description,
    //   maxPeople: maxPeople,
    //   longitude: longitude,
    //   latitude: latitude,
    //   category: category,
    //   tagsNames: tagNames,
    //   dateStart: dateStart,
    //   dateFinish: dateFinish,
    //   timeStart: timeStart,
    //   timeFinish: timeFinish,
    //   meetingUrl: meetingUrl,
    //   type: type,
    //   price: price,
    //   // thumbnail: thumbnail
    // };

    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    // console.log(formData.get('maxPeople'))
    // console.log(formData.get(''))

    return this.http.post<EventInterface[]>(`http://localhost:8081/api/events/create`, formData, { headers: headers })
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
    dateFinish: string,
    timeStart: string,
    timeFinish: string,
    meetingUrl: string,
    type: string,
    price: number,
    maxPeople: number,
    images: Image[],
    thumbnail: Image | null,
  ): Observable<EventInterface[]> {

    const body = {
      name: name,
      description: description,
      maxPeople: maxPeople,
      longitude: longitude,
      latitude: latitude,
      category: category,
      tagsNames: tagNames,
      dateStart: dateStart,
      dateFinish: dateFinish,
      timeStart: timeStart,
      timeFinish: timeFinish,
      meetingUrl: meetingUrl,
      type: type,
      price: price,
      // thumbnail: thumbnail?.file
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    console.log(body, id)
    return this.http.put<EventInterface[]>(`${this.url}/${id}/update`, body, { headers: headers })
  }

  getMyEvents(): Observable<EventInterface[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get<EventInterface[]>(`${this.url}/my-events`, { headers: headers })
  }

  deleteEvent(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.delete<EventInterface[]>(`${this.url}/${id}/delete`, { headers: headers })
  }

  publishTickets(eventId: number, price: string, numberOfTickets: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    const body = {
      eventId: eventId,
      price: price,
      numberOfTickets: numberOfTickets
    };
    return this.http.put<EventInterface[]>(`${this.url}/publish`, body, { headers: headers })
  }

  getEventById(id: string): Observable<EventInterface> {
    return this.http.get<EventInterface>(`${this.url}/${id}`)
  }

  buyTicket(id: number | undefined): Observable<EventInterface> {
    const numberOfTickets = 1

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    const body = {};

    return this.http.post<EventInterface>(`${this.url}/${id}/buy?num=${numberOfTickets}`, body, { headers: headers })
  }

  getEventCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/categories`)
  }

  getRelatedEvents(id: number | undefined): Observable<EventInterface[]> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.get<EventInterface[]>(`${this.url}/${id}/related`, { headers: headers })
  }


}
