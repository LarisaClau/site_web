import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../services/product.service'; //
import { Router } from '@angular/router';
import { MyAccountService } from '../services/my-account.service';
import { WishlistService } from '../services/wishlist.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-magazin',
  templateUrl: './magazin.component.html',
  styleUrls: ['./magazin.component.scss'],
})
export class MagazinComponent implements OnInit {
  products_new: any[] = [];
  products_bestseller: any[] = [];
  products_from_wishlist: any[] = [];

  currentUser: any;
  loggedIn: boolean = false;

  userId: any;

  message$ = this.messageService.message$;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private authService: MyAccountService,
    private wishlist: WishlistService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.productService.getNewProductsData().subscribe((res) => {
      if (res.status === 200) {
        this.products_new = res.data;
      }
      console.log(res);
    });

    this.productService.getBestsellerProductsData().subscribe((res) => {
      if (res.status === 200) {
        this.products_bestseller = res.data;
      }
      console.log(res);
    });

    this.currentUser = this.authService.getCurrentUser();

    if (this.currentUser) {
      this.loggedIn = true;

      this.currentUser.subscribe((userArray) => {
        userArray.forEach((user) => {
          this.userId = user.id;
          // va afișa id-ul utilizatorului curent din array
        });
      });
    }
    if(this.authService.isAuthenticated()) {
      this.wishlist.getWishlistData(this.userId).subscribe(res => {
        this.products_from_wishlist = res.data;
      })
    }
  
  }

  images = [
    {
      imageSrc: '../../assets/carousel3.jpg',
      imageAlt: 'carusel 1',
    },
    {
      imageSrc:
        '../../assets/carousel10.jpg',
      imageAlt: 'carusel 2',
    },
    {
      imageSrc:
        '../../assets/carousel7.jpg',
      imageAlt: 'carusel 3',
    },
    {
      imageSrc:
        '../../assets/carousel6.jpg',
      imageAlt: 'carusel 4',
    },
  ];

  navigateToProduct(id) {
    this.router.navigate(['/product'], { queryParams: { id: id } });
  }

  AddCart(id: any) {
    if(this.authService.isAuthenticated()) {
      this.productService
      .addProductCart(id, this.userId, 1, 'product')
      .subscribe((res) => {
        if (res.status === 200) {
          this.messageService.showMessage(res.message, 'success');
          this.authService.increaseNumberOfProducts();
        } else {
          this.messageService.showMessage(res.message, 'error');
        }
        console.log(res);
      });
    } else {
      this.messageService.showMessage('Trebuie sa fiti conectat pentru a adauga produse in cos!', 'error');
    }
    
  }

  heart = true;

  // Pentru ambele liste
  toggleShowDelete(productId) {
    if(this.authService.isAuthenticated()) {
      this.wishlist
      .deleteProductFromWishlist(productId, this.userId, 'product')
      .subscribe((res) => {
        if (res.status === 200) {
          this.messageService.showMessage(res.message, 'success');
        } else if (res.status === 100) {
          this.messageService.showMessage(res.message, 'error');
        }
        console.log(res);
      });

      this.ngOnInit();
    } 
  
  }

  toggleShowAdd(productId) {
    if(this.authService.isAuthenticated()) {
      this.wishlist
        .addProductToWishlist(productId, this.userId, 'product')
        .subscribe((res) => {
          if (res.status === 200) {
            this.messageService.showMessage(res.message, 'success');
          } else if (res.status === 100) {
            this.messageService.showMessage(res.message, 'error');
          }
          console.log(res);
        });
        this.ngOnInit();
    } else {
      this.messageService.showMessage('Trebuie sa fiti conectat pentru a adauga produse in lista de favorite!', 'error');
    }
  }

  verifiyIfWishlist(idProduct) {
    if(this.authService.isAuthenticated()) {
      if(this.products_from_wishlist) {
        return this.products_from_wishlist.some(item => item.id_product === idProduct && item.product_type == 'product' && item.id_user == this.userId);
        } else {
          return false;
        }
    } else {
      return false;
    }
  }
}
