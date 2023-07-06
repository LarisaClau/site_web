import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core'; 
import { BehaviorSubject, Observable } from 'rxjs'; 


export interface CartData {  
  status: number;
  message: string;
  data: any[];
}


@Injectable({  
  providedIn: 'root' 
})

export class CartService { 
  totalWithVoucherSubject = new BehaviorSubject<any>(null);


  constructor(private http: HttpClient) { 
  } 
    getCartData(userId: any):Observable<any> {
     const data = { id: userId };
     return this.http.post<CartData>('http://localhost/API/cart/getProductFromCartForUser.php', data); 
   }


  deleteProductFromCart(cartId: any): Observable<any> {
    const data = { cart_id: cartId};
    return this.http.post<any>('http://localhost/API/delete_product_from_cart/read.php', data);
  }

  verifyVoucher(voucher_code: any):Observable<any> {
    const data = { voucher_code: voucher_code };
    return this.http.post<any>('http://localhost/API/voucher/read.php', data); 
  }

  setTotalWithVoucher( voucher_procent: any) {
    this.totalWithVoucherSubject.next(voucher_procent);
  }

  getTotalWithVoucher () {
    return this.totalWithVoucherSubject.asObservable();
  }


}