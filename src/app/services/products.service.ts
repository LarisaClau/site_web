import { HttpClient } from '@angular/common/http'; // modul ce oferă suport pentru realizarea de cereri HTTP către un server
import { Injectable } from '@angular/core'; // decorator ce poate fi folosit pentru a marca o clasă ca fiind injectabilă
import { Observable } from 'rxjs'; // modul ce oferă suport pentru programarea reactivă


export interface ProductsData {  
  status: number;
  message: string;
  data: any[];
}

export interface ProductData {  
  status: number;
  message: string;
  data: any[];
}

@Injectable({  
  providedIn: 'root' 
})


export class ProductsService { 

  constructor(private http: HttpClient) { 
  }

  getProductsData():Observable<any> {
    return this.http.get<ProductsData>('http://localhost/API/products_home/read.php'); 
  }

  getProductById(productID: any ):Observable<any> {
    const data = { id: productID };
    return this.http.post<any>('http://localhost/API/product/getProductId.php', data );

  }

  addProductCart(productID: any, userId: any, finalQuantity: any, productType):Observable<any> {
    const data = { idProduct: productID,
                  idUser: userId,
                  quantity: finalQuantity,
                  productType: productType };
    return this.http.post<any>('http://localhost/API/add_product_to_cart/read.php', data );
  } 

  getBrandsData():Observable<any> {
    return this.http.get<any>('http://localhost/API/products_brands/read.php'); 
  }

}