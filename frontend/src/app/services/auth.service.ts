import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventInterface } from '../interfaces/event';
import { AuthResponse } from '../interfaces/auth-response';

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
    
    return this.http.post<AuthResponse>(`http://localhost:8080/api/auth/login`, body)

  }

  
  register(firstName: string, lastName: string, username: string, password: string) : Observable<AuthResponse>{
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: username,
      password: password,
    };
    
    return this.http.post<AuthResponse>(`http://localhost:8080/api/auth/register`, body)

  }
}
