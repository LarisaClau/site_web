import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs'; 


export interface CartData {  
  status: number;
  message: string;
  data: any[];
}


@Injectable({  
  providedIn: 'root' 
})

export class CartDeliveryService { 

  constructor(private http: HttpClient) { 
  } 

  //  getDeliveryMethodsData():Observable<any> {
  //   return this.http.get<any>('http://localhost/API/checkout/read_post.php'); 
  // }


}