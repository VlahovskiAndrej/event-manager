import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventInterface } from '../interfaces/event';
import { AuthResponse } from '../interfaces/auth-response';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) : Observable<AuthResponse>{
    const body = {
      email: username,
      password: password,
    };
    
    return this.http.post<AuthResponse>(`http://localhost:8081/api/auth/login`, body)

  }

  
  register(firstName: string, lastName: string, username: string, password: string) : Observable<AuthResponse>{
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: username,
      password: password,
    };
    
    return this.http.post<AuthResponse>(`http://localhost:8081/api/auth/register`, body)

  }

  logout(): void{
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    location.href = '/login'
  }

  getLoggedUser(): Observable<User>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.get<User>(`http://localhost:8081/api/auth/user-details`, { headers: headers })
  }

  updateUser(formData: any): Observable<User>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });


    return this.http.post<User>(`http://localhost:8081/api/auth/update`, formData, { headers: headers })
  }

}
