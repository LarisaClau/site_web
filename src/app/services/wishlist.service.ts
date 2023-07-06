import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs'; 


export interface WishlistData {  
  status: number;
  message: string;
  data: any[];
}


@Injectable({  
  providedIn: 'root' 
})

//utilizează obiectul HttpClient pentru a efectua o solicitare HTTP POST către un API pentru a obține datele din lista de produse dorite a unui utilizator.
export class WishlistService { 
//Aici se definește constructorul serviciului care primește obiectul HttpClient ca parametru
  constructor(private http: HttpClient) { 
  }
  //Această metodă primește ca parametru un ID de utilizator și construiește un obiect data care conține acest ID. 
  //Apoi, se utilizează metoda post a obiectului HttpClient pentru a efectua o solicitare HTTP POST către URL-ul specificat, cu datele din obiectul data. 
  //Rezultatul este un obiect de tip Observable<WishlistData>, care trebuie să fie importat din modulul rxjs/Observable.
    getWishlistData(userId: any):Observable<any> {
     const data = { id: userId };
     return this.http.post<WishlistData>('http://localhost/API/wishlist/getWishlistForUser.php', data); 
   }

   deleteProductFromWishlist(productId: any, userId: any, productType): Observable<any> {
    const data = { productId: productId,
                   userId: userId,
                   productType: productType };
    return this.http.post<any>('http://localhost/API/delete_product_from_wishlist/read.php', data);
  }

  addProductToWishlist(productId: any, userId: any, productType): Observable<any> {
    const data = { productId: productId,
                   userId: userId,
                   productType: productType };
    return this.http.post<any>('http://localhost/API/add_product_to_wishlist/read.php', data);
  }
}