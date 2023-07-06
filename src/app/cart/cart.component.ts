import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { MyAccountService } from '../services/my-account.service';
import { ProductsService } from '../services/product.service';
import { MessageService } from '../services/message.service';
import { WishlistService } from '../services/wishlist.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cart: any[] = [];
  cartCourse: any[] = [];
  currentUser: any;
  loggedIn : boolean = false;
  totalCourses : number = 0;
  totalProducts: number = 0;
  total: number;
  products_from_wishlist: any[] = [];
  courses_from_wishlist: any[] = [];

  userId: any;

  constructor(private cartService : CartService,
              private router: Router,
              private authService: MyAccountService,
              private productsService : ProductsService,
              private messageService: MessageService,
              private wishlist: WishlistService) {
  }

  ngOnInit(): void {
    this.totalCourses = 0;
    this.totalProducts = 0;
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

      // Apelăm metoda din CartService pentru a primi doar produsele din cart-ul utilizatorului curent
      this.cartService.getCartData(this.userId).subscribe(res => {
        if (res.status === 200) {
          this.cart = res.data;
          this.cartCourse = res.data_2;
    // Calculam totalul pentru cart
          for(let i=0; i< this.cartCourse.length; i++) {
            this.totalCourses = this.totalCourses + Number(this.cartCourse[i].price_total);
          }

          for(let i=0; i< this.cart.length; i++) {
            this.totalProducts = this.totalProducts + Number(this.cart[i].price_total);
          }

          this.total = this.totalProducts + this.totalCourses;
          this.totalWithVoucher = this.total;
          this.cartService.setTotalWithVoucher(this.total);

        }
        console.log(res);
      });
    }

    this.wishlist.getWishlistData(this.userId).subscribe(res => {
      this.products_from_wishlist = res.data;
      this.courses_from_wishlist = res.data_2;
    })

    if(this.cart.length == 0) {
      this.total = 0;
      this.totalWithVoucher = 0;
    }
  }

  message$ = this.messageService.message$;

  removeFromCart(id_cart: any, qty) {
    this.cartService.deleteProductFromCart(id_cart).subscribe(res => {
      if (res.status === 200) {
         // Eliminăm produsul din array-ul local
         const index = this.cart.findIndex(p => p.id_cart === id_cart);
         if (index !== -1) {
           this.cart.splice(index, 1);
         }

         const index_c = this.cartCourse.findIndex(p => p.id_cart === id_cart);
         if (index_c !== -1) {
           this.cartCourse.splice(index_c, 1);
         }

         this.messageService.showMessage(res.message, 'success');
         this.authService.decreaseNumberOfProductsWithX(qty);
         this.ngOnInit();
      } else {
        this.messageService.showMessage(res.message, 'error');
      }
      console.log(res);
    });
  }


   ////////////////////// quantity
   quantity: number = 1;
   showTest: boolean = false;
 
   increaseQuantity(id: any, i) {
    this.productsService.addProductCart(id, this.userId, 1, 'product').subscribe(res => {
      if (res.status === 200) {
        this.authService.increaseNumberOfProducts();
        this.ngOnInit();
        
      }
    });
   }
 
   decreaseQuantity(id: any, i) {
    if(this.cart[i].quantity > 1) {
      this.productsService.addProductCart(id, this.userId, -1, 'product').subscribe(res => {
        if (res.status === 200) {
          this.authService.decreaseNumberOfProducts();
          this.ngOnInit();
        }
      });
    }
    
   }

  isExpanded:boolean = false

  toggleText() {
    this.isExpanded = !this.isExpanded;
  }

  
  navigateToProduct(id) {
    this.router.navigate(['/product'], { queryParams: { id: id } });
  }

  navigateToCourse(id) {
    this.router.navigate(['/detalii-cursuri'], { queryParams: { id: id } });
  }

  navigateToDelivery() {
    if(this.cart.length > 0) {
    this.router.navigate(['/delivery']);
    } else {
      this.messageService.showMessage('Adauga produse in cos pentru a putea merge la pagina de plata!', 'error');
    }
  }

  voucher_code: string = '';
  voucher:  any[] = [];

  totalWithVoucher: number;
  procentVoucher: any;



  procent: any;

  applyVoucher() {
    if(this.cart.length > 0) {
      console.log(this.total)
      this.cartService.verifyVoucher(this.voucher_code).subscribe(res => {
        if (res.status === 200) {
         this.voucher = res.data;
         console.log(res);
 
         this.messageService.showMessage(res.message, 'success');
 
         let procent = parseInt(this.voucher[0].procent); // Accesare procent și convertirea în număr
         this.procentVoucher = procent;
         this.totalWithVoucher = this.total - this.total * this.procentVoucher / 100;
         this.cartService.setTotalWithVoucher(this.totalWithVoucher);
        } else if(res.status === 100) {
         this.messageService.showMessage(res.message, 'error');
        }
      }); 
    } else {
      this.messageService.showMessage('Adauga produse in cos pentru a putea aplica voucher-ul!', 'error');
    }
    
  }

  verifiyIfWishlist(idProduct) {
    if(this.products_from_wishlist) {
    return this.products_from_wishlist.some(item => item.id_product === idProduct && item.product_type == 'product' && item.id_user == this.userId );
    } else {
      return false;
    }
  }

  verifiyIfWishlistCourse(idProduct) {
    if(this.courses_from_wishlist) {
    return this.courses_from_wishlist.some(item => item.id_product === idProduct && item.product_type == 'course' && item.id_user == this.userId);
    } else {
      return false;
    }
  }


  toggleShowDelete(productId) {
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

  toggleShowAdd(productId) {
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
  }



  toggleShowDeleteCourse(productId) {
    this.wishlist.deleteProductFromWishlist(productId, this.userId, 'course').subscribe(res => {
      if (res.status === 200) {
        this.messageService.showMessage(res.message, 'success');
      } else {
        this.messageService.showMessage(res.message, 'error');
      }
    });
    this.ngOnInit();

  }

  toggleShowAddCourse(productId: any) {
    this.wishlist.addProductToWishlist(productId, this.userId, 'course').subscribe(res => {
      if (res.status === 200) {
        this.messageService.showMessage(res.message, 'success');
      } else {
        this.messageService.showMessage(res.message, 'error');
      }
    });
    this.ngOnInit();
  }
}
