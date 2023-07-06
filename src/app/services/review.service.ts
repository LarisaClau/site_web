import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs'; 

@Injectable({  
  providedIn: 'root' 
})

export class ReviewService { 

  constructor(private http: HttpClient) { 
  }
    getReviewData(userId: any):Observable<any> {
     const data = { id: userId };
     return this.http.post<any>('http://localhost/API/reviews/read_reviews.php', data); 
   }

   deleteReview(userId: any, id_review: any): Observable<any> {
    const data = {userId: userId,
                  id_review: id_review};
    return this.http.post<any>('http://localhost/API/reviews/read_delete.php', data);
  }
}