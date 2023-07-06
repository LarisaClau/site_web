import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { MyAccountService } from 'src/app/services/my-account.service';
import { ProductsService } from 'src/app/services/product.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-account-reviews',
  templateUrl: './account-reviews.component.html',
  styleUrls: ['./account-reviews.component.scss']
})
export class AccountReviewsComponent {

  reviews: any[] = [];
  reviewsCourses: any[] = [];

  currentUser: any;
  loggedIn: boolean = false;

  userId: any;

  constructor(private reviewService: ReviewService,
    private router: Router,
    private authService: MyAccountService,
    private cd : ChangeDetectorRef,
    private productsService : ProductsService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);

    if (this.currentUser) {
      this.loggedIn = true;

      this.currentUser.subscribe(userArray => {
        userArray.forEach(user => {
          this.userId = user.id;
          console.log(this.userId); // va afișa id-ul utilizatorului curent din array
        });
      });

      console.log(this.userId);
      // Apelăm metoda din WishlistService pentru a primi doar produsele utilizatorului curent
      this.reviewService.getReviewData(this.userId).subscribe(res => {
        if (res.status === 200) {
          this.reviews = res.data;
          this.reviewsCourses = res.data_2;
        }
        console.log(res);
      });
    }
  }

  message$ = this.messageService.message$;

   removeReview(id_review) {
     this.reviewService.deleteReview(this.userId, id_review).subscribe(res => {
       if (res.status === 200) {
         // Eliminăm produsul din array-ul local
         const index = this.reviews.findIndex(p => p.id_review === id_review);
         this.messageService.showMessage(res.message, 'success');
         if (index !== -1) {
           this.reviews.splice(index, 1);
         }
         this.cd.markForCheck();
       } else {
        this.messageService.showMessage(res.message, 'error');
       }
     });

     this.reviewService.deleteReview(this.userId, id_review).subscribe(res => {
       if (res.status === 200) {
         // Eliminăm produsul din array-ul local
         const index_c = this.reviewsCourses.findIndex(p => p.id_review === id_review);
         if (index_c !== -1) {
           this.reviewsCourses.splice(index_c, 1);
         }
         this.cd.markForCheck();
       }
       console.log(res);
     });
   }

  navigateToProduct(id) {
    this.router.navigate(['/product'], { queryParams: { id: id } });
  }

  navigateToCourse(id) {
    this.router.navigate(['/detalii-cursuri'], { queryParams: { id: id } });
  }
}
