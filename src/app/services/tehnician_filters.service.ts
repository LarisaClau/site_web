import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Tehnicians {  
    status: number;
    message: string;
    data: ArrayTehnicians;
  }
  
  export interface ArrayTehnicians {
    price_range: string;
    address: string;
  }
export interface PriceData {
    status: number;
    message: string;
    data: any[];
}


@Injectable({
    providedIn: 'root'
})

export class TehnicianFiltersService {

    constructor(private http: HttpClient) {
    }

    getTehnicianData(): Observable<any> {
        return this.http.get<any>('http://localhost/API/appointment/read.php');
    }


    //  getPriceData(): Observable<any> {
    //      return this.http.get<PriceData>('http://localhost/API/appointment/read_price.php');
    //    }

    //   //metoda care creeze o cerere GET către API-ul tău, cu parametriul de filtrare selectat de utilizator
    //   getCityData():Observable<any> {
    //     return this.http.get<TehnicianData>('http://localhost/API/appointment/read.php'); 
    //   }

    //   //metoda
    //   getPriceData():Observable<any> {
    //     return this.http.get<TehnicianData>('http://localhost/API/appointment/read.php'); 
    //   }

    //   getFilteredTechnicians(city: string, price: number): Observable<any> {
    //     const headers = new HttpHeaders().set('Content-Type', 'application/json');
    //     const params = new HttpParams().set('city', city).set('price', price.toString());
    //     const options = { headers: headers, params: params };
    //     return this.http.get<any>('http://localhost/API/appointment/read.php', options);
    //   }

}


// export class PricesService {

//     constructor(private http: HttpClient) {
//     }

//     getPriceData(): Observable<any> {
//         return this.http.get<PriceData>('http://localhost/API/appointment/read_price.php');
//       }

// }