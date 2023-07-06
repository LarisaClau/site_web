import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs'; 

@Injectable({  
  providedIn: 'root' 
})

export class AppointmentService { 

  constructor(private http: HttpClient) { 
  }
    getServicesCategory(id_tehnician: any):Observable<any> {
     const data = { id_tehnician: id_tehnician };
     return this.http.post<any>('http://localhost/API/services_category/read.php', data); 
   }

   getServices(id_tehnician: any):Observable<any> {
    const data = { id_tehnician: id_tehnician };
    return this.http.post<any>('http://localhost/API/services_category/read.php', data); 
  }

  getRezervari(idTehnician : any):Observable<any> {
    const data = { id_tehnician: idTehnician };
    return this.http.post<any>('http://localhost/API/rezervari/read.php', data);  
  }

  insertRezervare(userId: any, idTehnician : any, selectedDay : string, selectedIdService: any, hour : any):Observable<any> {
    const data = { 
      userId: userId,
      idTehnician: idTehnician,
      selectedDay: selectedDay,
      selectedIdService: selectedIdService,
      hour: hour,
    };
    console.log("test" + selectedDay)
    return this.http.post<any>('http://localhost/API/rezervari/insert.php', data); 
  }

}