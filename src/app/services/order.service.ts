import { HttpClient } from '@angular/common/http'; // modul ce oferă suport pentru realizarea de cereri HTTP către un server
import { Injectable } from '@angular/core'; // decorator ce poate fi folosit pentru a marca o clasă ca fiind injectabilă
import { Observable } from 'rxjs'; // modul ce oferă suport pentru programarea reactivă

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    constructor(private http: HttpClient) { }

    sendOrder(userId: any, delivery: any, payment: any, shippingAddress: any, shippingAddressBill: any, total: any): Observable<any> {
        const data = {
            id_user: userId,
            delivery_method: delivery,
            payment_method: payment,
            shipping_address: shippingAddress,
            billing_address: shippingAddressBill,
            total: total,
        };
        return this.http.post<any>('http://localhost/API/checkout/read.php', data);
    }

    getOrdersList(userId: any):Observable<any> {
        const data = { id: userId };
        return this.http.post<any>('http://localhost/API/orders/read.php', data); 
    }

getOrderById(userId: any, id_order: any):Observable<any> {
    const data = { 
        id: userId,
        id_order: id_order
     };
    return this.http.post<any>('http://localhost/API/order/read.php', data); 
}
 }
