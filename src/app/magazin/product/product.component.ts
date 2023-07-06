import { Component, Input } from '@angular/core';
import { ProductsService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { MyAccountService } from 'src/app/services/my-account.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  product: any[] = [];

  currentUser: any;
  loggedIn: boolean = false;
  userId: any;
  id: any;
  newIdPage: any;

  review_details: FormGroup;
  products_from_wishlist: any[] = [];

  reviews: any[] = [];
  reviews_list: any[] = [];
  total_rating: number;
  num_of_rating: number;
  media_rating: number = 0;

  totalStars: number = 0;
  stars1: number = 0;
  stars2: number = 0;
  stars3: number = 0;
  stars4: number = 0;
  stars5: number = 0;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: MyAccountService,
    private messageService: MessageService,
    private wishlist: WishlistService,
    private route: ActivatedRoute,
    private navbarService: NavbarService
  ) {
    this.review_details = this.formBuilder.group({
      review: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      fname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }

  get f() {
    return this.review_details.controls;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.navbarService.idProduct$.subscribe((res) => {
      this.newIdPage = res;
      if (Object.keys(this.newIdPage).length !== 0) {
        console.log(this.newIdPage + 'asd');
        this.id = this.newIdPage;
        this.getProductData();
      }
    });
    this.getProductData();
  }

  getProductData() {
    this.productsService.getProductById(this.id).subscribe((res) => {
      if (res.status === 200) {
        this.product = res.data;
      }
      console.log(res);
    });

    this.productsService
      .getReviewsByProductId(this.id, 'product')
      .subscribe((res) => {
        if (res.status === 200) {
          this.reviews_list = res.data;
        }
        console.log(res);

        this.num_of_rating = 0;
        this.total_rating = 0;

        for (let i = 0; i < this.reviews_list.length; i++) {
          this.total_rating =
            this.total_rating + Number(this.reviews_list[i].star);
          this.num_of_rating = this.num_of_rating + 1;
        }

        var calculatedRating = this.total_rating / this.num_of_rating;
        this.media_rating = Number(calculatedRating.toFixed(1));

        this.num_of_rating = 0;
        this.total_rating = 0;
        this.stars1 = 0;
        this.stars2 = 0;
        this.stars3 = 0;
        this.stars4 = 0;
        this.stars5 = 0;

        this.reviews_list.forEach((review) => {
          const rating = Number(review.star);
          this.total_rating += rating;
          this.num_of_rating++;

          switch (rating) {
            case 1:
              this.stars1++;
              break;
            case 2:
              this.stars2++;
              break;
            case 3:
              this.stars3++;
              break;
            case 4:
              this.stars4++;
              break;
            case 5:
              this.stars5++;
              break;
            default:
              break;
          }
        });

        this.totalStars =
          this.stars1 + this.stars2 + this.stars3 + this.stars4 + this.stars5;
      });

    this.currentUser = this.authService.getCurrentUser();

    if (this.authService.isAuthenticated()) {
      this.loggedIn = true;

      this.currentUser.subscribe((userArray) => {
        userArray.forEach((user) => {
          this.userId = user.id;
          // va afișa id-ul utilizatorului curent din array
        });
      });
    }
    if(this.userId) {
      this.wishlist.getWishlistData(this.userId).subscribe((res) => {
        this.products_from_wishlist = res.data;
      });
    }
  }

  message$ = this.messageService.message$;

  AddCart(id: any) {
    if (this.authService.isAuthenticated()) {
      this.productsService
        .addProductCart(id, this.userId, this.finalQuantity, 'product')
        .subscribe((res) => {
          if (res.status === 200) {
            this.messageService.showMessage(res.message, 'success');
            this.authService.increaseNumberOfProductsWithX(this.finalQuantity);
          } else {
            this.messageService.showMessage(res.message, 'error');
          }
          console.log(res);
        });
    } else {
      this.messageService.showMessage(
        'Trebuie sa fii conectat sa poti adauga produse in cos!',
        'error'
      );
    }
  }

  toggleShowDelete(productId) {
    if (this.authService.isAuthenticated()) {

    this.wishlist
      .deleteProductFromWishlist(productId, this.userId, 'product')
      .subscribe((res) => {
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
        'Trebuie sa fii conectat pentru a putea sterge produse din lista de favorite!',
        'error'
      );
    }
  }

  toggleShowAdd(productId: any) {
    if (this.authService.isAuthenticated()) {
      this.wishlist
        .addProductToWishlist(productId, this.userId, 'product')
        .subscribe((res) => {
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
        'Trebuie sa fii conectat pentru a putea adauga review-uri!',
        'error'
      );
    }
  }

  ////////////////////// quantity
  quantity: number = 11;
  showTest: boolean = false;

  finalQuantity: number = 1;

  onChangeQuantity(selectedQuantity) {
    const selectedValue = parseInt(
      (document.getElementById('q') as HTMLSelectElement).value,
      10
    );
    this.showTest = selectedValue === 11;
    this.finalQuantity = selectedQuantity;
  }

  increaseQuantity() {
    this.quantity++;
    this.finalQuantity = this.quantity;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.finalQuantity = this.quantity;
    }
  }

  activeTab: string = 'Descriere';

  onTabClick(tab) {
    this.activeTab = tab;
  }

  rating: number;

  onSubmitReview() {
    if (this.authService.isAuthenticated()) {
      const id = this.activatedRoute.snapshot.queryParamMap.get('id');
      this.productsService
        .addReview(
          this.userId,
          this.review_details.value.fname,
          this.review_details.value.review,
          this.rating,
          id,
          'product'
        )
        .subscribe((res) => {
          if (res.status === 200) {
            this.reviews = res.data;
            this.messageService.showMessage(res.message, 'success');
            console.log(res);
            this.ngOnInit();
          } else {
            this.messageService.showMessage(res.message, 'error');
          }
        });
    } else {
      this.messageService.showMessage(
        'Trebuie sa fii conectat pentru a putea adauga review-uri!',
        'error'
      );
    }
  }

  verifiyIfWishlist(idProduct) {
    if (this.authService.isAuthenticated()) {
      if (this.products_from_wishlist) {
        return this.products_from_wishlist.some(
          (item) =>
            item.id_product === idProduct &&
            item.product_type == 'product' &&
            item.id_user == this.userId
        );
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
