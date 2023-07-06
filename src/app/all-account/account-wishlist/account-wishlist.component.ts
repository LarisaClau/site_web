import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { MyAccountService } from 'src/app/services/my-account.service';
import { ProductsService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-account-wishlist',
  templateUrl: './account-wishlist.component.html',
  styleUrls: ['./account-wishlist.component.scss']
})
export class AccountWishlistComponent {

  wishlist: any[] = [];
  wishlistCourses: any[] = [];

  currentUser: any;
  loggedIn: boolean = false;

  userId: any;

  constructor(private wishlistService: WishlistService,
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
      // Apelăm metoda din WishlistService pentru a primi doar produsele din wishlist-ul utilizatorului curent
      this.wishlistService.getWishlistData(this.userId).subscribe(res => {
        if (res.status === 200) {
          this.wishlist = res.data;
          this.wishlistCourses = res.data_2;
        }
        console.log(res);
      });
    }
  }

  message$ = this.messageService.message$;

  removeFromWishlist(idProduct, id_wishlist) {
    this.wishlistService.deleteProductFromWishlist(idProduct, this.userId, 'product').subscribe(res => {
      if (res.status === 200) {
        // Eliminăm produsul din array-ul local
        this.messageService.showMessage(res.message, 'success');
        const index = this.wishlist.findIndex(p => p.id_wishlist === id_wishlist);
        if (index !== -1) {
          this.wishlist.splice(index, 1);
        } 
        this.cd.markForCheck();    
      } else {
        this.messageService.showMessage(res.message, 'error');
      }
      console.log(res);
    });
    this.wishlistService.deleteProductFromWishlist(idProduct, this.userId, 'course').subscribe(res => {
      if (res.status === 200) {
        // Eliminăm produsul din array-ul local
        const index_c = this.wishlistCourses.findIndex(p => p.id_wishlist === id_wishlist);
        this.messageService.showMessage(res.message, 'success');
        if (index_c !== -1) {
          this.wishlistCourses.splice(index_c, 1);
        }
        this.cd.markForCheck();
      } else {
        this.messageService.showMessage(res.message, 'error');
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


  finalQuantity: number = 1;

  AddCart(id: any) {
    this.productsService.addProductCart(id, this.userId, this.finalQuantity, 'product').subscribe(res => {
      if (res.status === 200) {
        this.messageService.showMessage(res.message, 'success');
        this.authService.increaseNumberOfProducts();
      } else {
        this.messageService.showMessage(res.message, 'error');
      }
      console.log(res);
    });
  }
}

