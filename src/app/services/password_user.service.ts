import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';


const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root',
})
export class PasswordUserService {
  loginArray: any[] = [];
  private currentUserSubject = new BehaviorSubject<any>(null);


  constructor(private http: HttpClient) {}

  updateUserPassword(userId: any, userPassword: any, userNewPassword: any):Observable<any> {
    const data = {id: userId,
                  password: userPassword,
                  newPassword: userNewPassword};
    return this.http.post<any>('http://localhost/API/password_user/read.php', data );
  } 
}