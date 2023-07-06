import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PriceData {
    status: number;
    message: string;
    data: any[];
}

@Injectable({
    providedIn: 'root'
})

export class TehnicianFilterPriceService {

    constructor(private http: HttpClient) {
    }

     getPriceData(): Observable<any> {
         return this.http.get<PriceData>('http://localhost/API/appointment/read_price.php');
       }

}

