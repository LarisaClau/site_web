import { HttpClient } from '@angular/common/http'; // modul ce oferă suport pentru realizarea de cereri HTTP către un server
import { Injectable } from '@angular/core'; // decorator ce poate fi folosit pentru a marca o clasă ca fiind injectabilă
import { Observable } from 'rxjs'; // modul ce oferă suport pentru programarea reactivă


export interface SubcategoryData {  
  status: number;
  message: string;
  data: any[];
}

@Injectable({  
  providedIn: 'root' 
})


export class ProductsSubcategoryService { 

  constructor(private http: HttpClient) { 
  }

  getSubcategoryData():Observable<any> {
    return this.http.get<SubcategoryData>('http://localhost/API/products_subcategory/read.php'); 
  }

  getProductById(productID: any ):Observable<any> {
    const data = { id: productID };
    return this.http.post<any>('http://localhost/API/product/getProductId.php', data );
  }

  getProductByIdSubcategory(subcategoryID: any ):Observable<any> {
    const data = { id: subcategoryID };
    return this.http.post<any>('http://localhost/API/products_subcategory/getSubcategoryId.php', data );
  }

}