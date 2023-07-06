import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  fname: string;
  birthday: string;
  email: string;
  password: string;
}

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root',
})
export class AboutUserService {
  loginArray: any[] = [];
  private currentUserSubject = new BehaviorSubject<any>(null);


  constructor(private http: HttpClient) {}

  updateUserDetails(userId: any,userName: any, userFname: any, userBirthday: any, userPhone):Observable<any> {
    const data = {id: userId,
                  name: userName,
                  fname: userFname,
                  birthday: userBirthday,
                  phone: userPhone };
    return this.http.post<any>('http://localhost/API/about_user/read.php', data );
  } 
}