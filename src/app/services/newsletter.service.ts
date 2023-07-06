import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface UserData {
  status: number;
  message: string;
  data: any[];
}

export interface NewsletterEmailData {
    email: string;
}

const headers = new HttpHeaders().set('Content-Type', 'application/json');


@Injectable({
  providedIn: 'root'
})

export class NewsletterService {


  constructor(private http: HttpClient) { 
  }

  sentNewsletterEmailData(data : NewsletterEmailData ):Observable<any> {
    return this.http.post<any>('http://localhost/API/newsletter/read.php', data, { headers });
  }

}
