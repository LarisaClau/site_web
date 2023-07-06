import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class StatisticsService {

    constructor(private http: HttpClient) {
    }

    getNumOfProducts(): Observable<any> {
        return this.http.get<any>('http://localhost/API/statistics/read.php');
    }

    getNumOfSubcategories(): Observable<any> {
        return this.http.get<any>('http://localhost/API/statistics/read_subcateg.php');
    }

    getNumOfTrainers(): Observable<any> {
        return this.http.get<any>('http://localhost/API/statistics/read_trainers.php');
    }

    getNumOfCities(): Observable<any> {
        return this.http.get<any>('http://localhost/API/statistics/read_city.php');
    }

    getNumOfUsers(): Observable<any> {
        return this.http.get<any>('http://localhost/API/statistics/read_users.php');
    }

    getNumOfOrders(): Observable<any> {
        return this.http.get<any>('http://localhost/API/statistics/read_orders.php');
    }

    getNumOfAppointments(): Observable<any> {
        return this.http.get<any>('http://localhost/API/statistics/read_appointments.php');
    }

    getNumOfCourses(): Observable<any> {
        return this.http.get<any>('http://localhost/API/statistics/read_courses.php');
    }

}