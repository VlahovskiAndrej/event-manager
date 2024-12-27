import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventInterface } from '../interfaces/event';

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


  getFilteredResults(query: string, date: string[], categories: string[]) {
    if (query == "[object Object]") {
      query = ""
    }

    if (date.includes("")) {
      var started: string = "1970-01-01"
      var finished: string = "2026-01-01"
    }
    else {
      var started: string = this.convertDateFormat(date[0])
      var finished: string = this.convertDateFormat(date[1])
    }
    if (categories.length != 0) categories = categories.filter(x => x != "ALL")
    if (categories.length == 0 || categories.includes("")) categories.push("ALL")

    return this.http.get<EventInterface[]>(`${this.url}/filteredResults?query=${query}&started=${started}&finished=${finished}&categories=${categories.join(',')}`)
  }


  convertDateFormat(inputDate: string) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }


  getImages(id: number, num: number): Observable<Blob>{
    // console.log(id, num)
    return this.http.get(`http://localhost:8081/api/events/${id}/images/${num}`,
    {
      responseType: 'blob',
    }
    )
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

  createEvent(formData: FormData) {

    const headers = new HttpHeaders({
      //  'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.post<String>(`http://localhost:8081/api/events/upload`, formData, { headers: headers })
  }



  updateEvent(formData: FormData, id: number) {

    const headers = new HttpHeaders({
      //  'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

   
    console.log("file: " + formData.get('files'))
    console.log("type: " + formData.get('type'))
    console.log("meetingUrl: " + formData.get('meetingUrl'))
    console.log("timeStart: " + formData.get('timeStart'))
    console.log("dateStart: " + formData.get('dateStart'))
    console.log("tagsNames: " + formData.get('tagsNames'))
    console.log("category: " + formData.get('category'))
    console.log("longitude: " + formData.get('longitude'))




    return this.http.post<String>(`http://localhost:8081/api/events/${id}/update`, formData, { headers: headers })
  }


  // updateEvent(
  //   id: string,
  //   name: string,
  //   description: string,
  //   longitude: string,
  //   latitude: string,
  //   category: string,
  //   tagNames: string[],
  //   dateStart: string,
  //   dateFinish: string,
  //   timeStart: string,
  //   timeFinish: string,
  //   meetingUrl: string,
  //   type: string,
  //   price: number,
  //   maxPeople: number,
  //   images: Image[],
  //   thumbnail: Image | null,
  // ): Observable<EventInterface[]> {

  //   const body = {
  //     name: name,
  //     description: description,
  //     maxPeople: maxPeople,
  //     longitude: longitude,
  //     latitude: latitude,
  //     category: category,
  //     tagsNames: tagNames,
  //     dateStart: dateStart,
  //     dateFinish: dateFinish,
  //     timeStart: timeStart,
  //     timeFinish: timeFinish,
  //     meetingUrl: meetingUrl,
  //     type: type,
  //     price: price,
  //     // thumbnail: thumbnail?.file
  //   };

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + localStorage.getItem('token'),
  //   });

  //   console.log(body, id)
  //   return this.http.put<EventInterface[]>(`${this.url}/${id}/update`, body, { headers: headers })
  // }

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

  buyTicket(id: number | undefined, num: string): Observable<EventInterface> {
    const numberOfTickets = 1

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    const body = {};

    return this.http.post<EventInterface>(`${this.url}/${id}/buy?num=${num}`, body, { headers: headers })
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
