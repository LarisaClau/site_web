import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs'; 

export interface CoursesData {  
  status: number;
  message: string;
  data: any[];
}

@Injectable({  
  providedIn: 'root' 
})

export class CoursesService { 

  constructor(private http: HttpClient) { 
  }

  getCoursesData():Observable<any> {
    return this.http.get<CoursesData>('http://localhost/API/courses/read.php'); 
  }

  getCourseById(courseID: any ):Observable<any> {
    const data = { id: courseID };
    return this.http.post<any>('http://localhost/API/course/getCourseId.php', data );
  }

  getCitysByIdYear(yearID: any ):Observable<any> {
    const data = { id: yearID };
    return this.http.post<any>('http://localhost/API/course/getYearId.php', data );
  }

  getDatesByIdCity(cityID: any ):Observable<any> {
    const data = { id: cityID };
    return this.http.post<any>('http://localhost/API/course/getCityId.php', data );
  }

  addCourseToCart(productID: any, userId: any, finalQuantity: any, productType: any, idYear: any, idCity: any, idDate: any, teach: any, payment: any):Observable<any> {
    const data = { idProduct: productID,
                  idUser: userId,
                  quantity: finalQuantity,
                  productType: productType, 
                  year: idYear,
                  city: idCity,
                  date: idDate,
                  teach: teach,
                  payment: payment};
    return this.http.post<any>('http://localhost/API/add_product_to_cart/read.php', data );
  } 

 
}