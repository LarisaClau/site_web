//  face o cerere GET către un API, cu scopul de a obține datele produselor

import { HttpClient } from '@angular/common/http'; // modul ce oferă suport pentru realizarea de cereri HTTP către un server
import { Injectable } from '@angular/core'; // decorator ce poate fi folosit pentru a marca o clasă ca fiind injectabilă
import { Observable } from 'rxjs'; // modul ce oferă suport pentru programarea reactivă


export interface ProductsData {  // specifică structura datelor de răspuns care vor fi primite de la serverul API
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
  providedIn: 'root' // specifică modul în care serviciul va fi furnizat. 
  //'root' indică faptul că serviciul va fi furnizat la nivelul întregii aplicații
})

// efectueaza apeluri HTTP către API-ul din backend-ul aplicației și returneaza datele în format JSON către componentele care le solicită
export class ProductsService {
  
  constructor(private http: HttpClient) { // injectează un obiect HttpClient, care este furnizat de către Angular și este responsabil pentru efectuarea cererilor HTTP
  }

  getNewProductsData():Observable<any> {
    // this.http.get() primește ca parametru adresa URL a endpoint-ului API-ului, care este "http://localhost/API/products/read.php"
    //Endpoint-ul respectiv este responsabil pentru returnarea datelor JSON ale listei de produse.
    return this.http.get<ProductsData>('http://localhost/API/products_home_store/read_new.php'); 
  }

  getBestsellerProductsData():Observable<any> {
    return this.http.get<ProductsData>('http://localhost/API/products_home_store/read_bestseller.php'); 
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

  addReview(id_user: any, user_name: any, review: any, stars: any, id_product: any, type: any):Observable<any> {
    const data = { id_user: id_user,
                  user_name: user_name,
                  review: review,
                  stars: stars,
                  id_product: id_product,
                  type: type};
    return this.http.post<any>('http://localhost/API/reviews/read.php', data );
  }

  getReviewsByProductId(productID: any, type: any):Observable<any> {
    const data = { id_product: productID,
                   type: type };
    return this.http.post<any>('http://localhost/API/product_reviews/read.php', data );

  }

}

