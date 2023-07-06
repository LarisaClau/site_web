import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Router } from '@angular/router';
import { WishlistService } from '../services/wishlist.service';
import { MyAccountService } from '../services/my-account.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-cursuri',
  templateUrl: './cursuri.component.html',
  styleUrls: ['./cursuri.component.scss']
})

export class CursuriComponent implements OnInit {

  currentUser: any;
  loggedIn: boolean = false;
  userId: any;
  courses_from_wishlist: any[] = [];

  courses: any[] = [];

  constructor(private coursesService: CoursesService,
    private wishlist: WishlistService,
    private router: Router,
    private authService: MyAccountService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.coursesService.getCoursesData().subscribe(res => {
      if (res.status === 200) {
        this.courses = res.data;
      }
      console.log(res);
    })

    this.currentUser = this.authService.getCurrentUser();

    if (this.currentUser) {
      this.loggedIn = true;

      this.currentUser.subscribe(userArray => {
        userArray.forEach(user => {
          this.userId = user.id;
          console.log(this.userId);
        });
      });
    }
    if (this.authService.isAuthenticated()) {
      this.wishlist.getWishlistData(this.userId).subscribe(res => {
        this.courses_from_wishlist = res.data_2;
      })
    }
  }

  navigateToCourse(id) {
    this.router.navigate(['/detalii-cursuri'], { queryParams: { id: id } });
  }

  heart = true;

  toggleShowDelete(productId) {
    if (this.authService.isAuthenticated()) {
      this.wishlist.deleteProductFromWishlist(productId, this.userId, 'course').subscribe(res => {
        if (res.status === 200) {
          this.messageService.showMessage(res.message, 'success');
        } else {
          this.messageService.showMessage(res.message, 'error');
        }
        console.log(res);
      });
      this.ngOnInit();
    }
  }

  toggleShowAdd(productId: any) {
    if (this.authService.isAuthenticated()) {
      this.wishlist.addProductToWishlist(productId, this.userId, 'course').subscribe(res => {
        if (res.status === 200) {
          this.messageService.showMessage(res.message, 'success');
        } else {
          this.messageService.showMessage(res.message, 'error');
        }
        console.log(res);
      });
      this.ngOnInit();
    } else {
      this.messageService.showMessage(
        'Trebuie sa fii conectat pentru a putea adauga produse in lista de dorinte!',
        'error'
      );
    }
  }

  verifiyIfWishlist(idProduct) {
    if (this.authService.isAuthenticated()) {
      if(this.courses_from_wishlist) {
        return this.courses_from_wishlist.some(item => item.id_product === idProduct && item.product_type == 'course' && item.id_user == this.userId);
        } else {
          return false;
        }
    } else {
      return false;
    }
  }
}

