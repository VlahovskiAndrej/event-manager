import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventInterface } from '../interfaces/event';
import { Coupon } from '../interfaces/coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor(private http: HttpClient) { }

  getCoupons(): Observable<Coupon[]> {

    const headers = new HttpHeaders({
      //  'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    console.log('da')
    return this.http.get<Coupon[]>(`http://localhost:8081/api/coupons`, {headers: headers})
  }

  createCoupon(name: string, percentageDiscount: number) : Observable<Coupon>{
    
    const formData = new FormData();
    formData.append("name", name)
    formData.append("percentageDiscount", percentageDiscount.toString())
    


    const headers = new HttpHeaders({
      //  'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.post<Coupon>(`http://localhost:8081/api/coupons/create`, formData, {headers: headers}) 
  }

  deleteCoupon(name: string) : Observable<any>{
    
    const headers = new HttpHeaders({
      //  'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.delete<any>(`http://localhost:8081/api/coupons/remove/${name}`, {headers: headers}) 
  }
}
