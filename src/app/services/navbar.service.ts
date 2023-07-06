import { HttpClient } from '@angular/common/http'; // modul ce oferă suport pentru realizarea de cereri HTTP către un server
import { Injectable } from '@angular/core'; // decorator ce poate fi folosit pentru a marca o clasă ca fiind injectabilă
import { Observable, Subject } from 'rxjs'; // modul ce oferă suport pentru programarea reactivă

@Injectable({  
  providedIn: 'root' 
})


export class NavbarService { 
  public idProductSubject = new Subject<string>();
  idProduct$ = this.idProductSubject.asObservable();
  
  constructor(private http: HttpClient) { 
  }

  NumofProductsFromCart(userId: any):Observable<any> {
    const data = {id_user: userId};
    return this.http.post<any>('http://localhost/API/cart_count_products/read.php', data );
  } 

  searchProduct(searchValue: string):Observable<any> {
    const data = {searchValue: searchValue};
    return this.http.post<any>('http://localhost/API/searchProduct/read.php', data );
  }
  

  setIdForProductPage(id : any) {
    this.idProductSubject.next(id);
    setTimeout(() => {this.idProductSubject.next('');}, 100);
  }
}