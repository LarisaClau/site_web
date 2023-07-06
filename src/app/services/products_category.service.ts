import { HttpClient } from '@angular/common/http'; // modul ce oferă suport pentru realizarea de cereri HTTP către un server
import { Injectable } from '@angular/core'; // decorator ce poate fi folosit pentru a marca o clasă ca fiind injectabilă
import { Observable } from 'rxjs'; // modul ce oferă suport pentru programarea reactivă


export interface CategoryData {  
  status: number;
  message: string;
  data: any[];
}

@Injectable({  
  providedIn: 'root' 
})


export class ProductsCategoryService { 

  constructor(private http: HttpClient) { 
  }

  getCategoryData():Observable<any> {
    return this.http.get<CategoryData>('http://localhost/API/products_category/read.php'); 
  }

  getProductByIdCategory(categoryID: any ):Observable<any> {
    const data = { id: categoryID };
    return this.http.post<any>('http://localhost/API/products_category/getCategoryId.php', data );
  }

}