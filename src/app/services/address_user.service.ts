import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';


const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root',
})
export class AddressUserService {
  loginArray: any[] = [];
  private currentUserSubject = new BehaviorSubject<any>(null);


  constructor(private http: HttpClient) {}

  updateUserAddress(userId: any, userAddress: any):Observable<any> {
    const data = {id: userId,
                  address: userAddress};
    return this.http.post<any>('http://localhost/API/address_user/read.php', data );
  } 
}