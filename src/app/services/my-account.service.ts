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
export class MyAccountService {
  loginArray: any[] = [];
  numberOfProducts : number = 0;
  currentUserSubject = new BehaviorSubject<any>(null);
  numberOfProductsSubject = new BehaviorSubject<any>(null);
  booleanAutentificat = false;

  constructor(private http: HttpClient) {}

  sentRegisterUserData(data: RegisterData): Observable<any> {
    return this.http.post<any>('http://localhost/API/account/register.php', data,{ headers });
  } 
  
  sentLoginData(data: LoginData): Observable<any> {
    return this.http.post<any>('http://localhost/API/account/login.php', data, { headers }).pipe(tap((res) => {
          if (res.status === 200) {
            for (let i = 0; i < res.data.length; i++) {
              this.loginArray.push({
                id: res.data[i].id,
                fname: res.data[i].fname,
                name: res.data[i].name,
                birthday: res.data[i].birthday,
                created: res.data[i].created,
                email: res.data[i].email,
                phone: res.data[i].phone,
                address: res.data[i].address
              });
            }
            localStorage.setItem('authToken', JSON.stringify(this.loginArray));
            this.currentUserSubject.next(JSON.parse(localStorage.getItem('authToken')));
          }
        })
      );
  }

  getCurrentUser() {
    this.currentUserSubject.next(JSON.parse(localStorage.getItem('authToken')));
    return this.currentUserSubject.asObservable();
  }

  isAuthenticated():any {
    this.currentUserSubject.asObservable().subscribe(res => {
      if ( res ) {
        this.booleanAutentificat = true;
      } else {
        this.booleanAutentificat = false;

      }
    })
    return this.booleanAutentificat;
  }

  logout() {
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
    this.numberOfProductsSubject.next(0);
  }

  setNumberOfProducts(count) {
    this.numberOfProductsSubject.next(count);
  }

  //Crestem cu 1 numarul de produse adaugate in cos
  increaseNumberOfProducts() {
    this.numberOfProductsSubject.subscribe(oldNumber => {
      this.numberOfProducts = oldNumber;
      this.numberOfProducts++;
    });
    this.numberOfProductsSubject.next(this.numberOfProducts);
  }

    //Scadem cu 1 numarul de produse adaugate in cos
    decreaseNumberOfProducts() {
      this.numberOfProductsSubject.subscribe(oldNumber => {
        this.numberOfProducts = oldNumber;
        this.numberOfProducts--;
      });
      this.numberOfProductsSubject.next(this.numberOfProducts);
    }

     //Crestem cu x numarul de produse adaugate in cos
  increaseNumberOfProductsWithX(numbers) {
    this.numberOfProductsSubject.subscribe(oldNumber => {
      this.numberOfProducts = oldNumber;
      this.numberOfProducts = Number(this.numberOfProducts) + Number(numbers);
    });
    this.numberOfProductsSubject.next(this.numberOfProducts);
  }

  decreaseNumberOfProductsWithX(numbers) {
    this.numberOfProductsSubject.subscribe(oldNumber => {
      this.numberOfProducts = oldNumber;
      this.numberOfProducts = Number(this.numberOfProducts) - Number(numbers);
    });
    this.numberOfProductsSubject.next(this.numberOfProducts);
  }
}
