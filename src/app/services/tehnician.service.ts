import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs'; 

@Injectable({  
  providedIn: 'root' 
})

export class TehnicianService { 

  constructor(private http: HttpClient) { 
  }
    getServices(id_tehnician: any):Observable<any> {
     const data = { id_tehnician: id_tehnician };
     return this.http.post<any>('http://localhost/API/tehnician_services/read.php', data); 
   }

   getTehnician(id_tehnician: any):Observable<any> {
    const data = { id_tehnician: id_tehnician };
    return this.http.post<any>('http://localhost/API/tehnician/read.php', data); 
  }

  getServicesCategory():Observable<any> {
    return this.http.get<any>('http://localhost/API/services_category/read.php'); 
  }


}