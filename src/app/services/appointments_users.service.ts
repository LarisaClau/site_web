import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs'; 

@Injectable({  
  providedIn: 'root' 
})

export class AppointmentsUsersService { 

  constructor(private http: HttpClient) { 
  }
    getAppointmentsUsers(userId: any):Observable<any> {
     const data = { id_user: userId };
     return this.http.post<any>('http://localhost/API/appointments_user/read.php', data); 
   }

   deleteAppointment(id_appointments: any): Observable<any> {
    const data = { id_appointment: id_appointments};
    return this.http.post<any>('http://localhost/API/appointments_user/read_delete.php', data);
  }

}