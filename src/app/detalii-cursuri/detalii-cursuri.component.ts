import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { MyAccountService } from '../services/my-account.service';
import { WishlistService } from '../services/wishlist.service';
import { ProductsService } from '../services/product.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-detalii-cursuri',
  templateUrl: './detalii-cursuri.component.html',
  styleUrls: ['./detalii-cursuri.component.scss'],
})
export class DetaliiCursuriComponent implements OnInit {
  activeTab: string = 'Detalii';


  onTabClick(tab) {
    this.activeTab = tab;
  }

  course: any[] = [];

  currentUser: any;
  loggedIn: boolean = false;
  userId: any;

  years: any;
  cities: any;
  dates: any;

  selectedYear: any;
  selectedCity: any;
  dateIntroduse: FormGroup;
  varstaBoolean: boolean = false;
  apasatPeAddToCart: boolean = false;
  anSelectatBoolean: boolean = false;
  orasSelectatBoolean: boolean = false;

  review_details: FormGroup;

  reviews: any[] = [];
  reviews_list: any[] = [];
  courses_from_wishlist: any[] = [];
  total_rating: number;
  num_of_rating: number;
  media_rating: number;

  totalStars: number = 0;
  stars1: number = 0;
  stars2: number = 0;
  stars3: number = 0;
  stars4: number = 0;
  stars5: number = 0;

  constructor(
    private coursesService: CoursesService,
    private wishlist: WishlistService,
    private activatedRoute: ActivatedRoute,
    private authService: MyAccountService,
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private messageService: MessageService
  ) {
    this.dateIntroduse = this.formBuilder.group({
      year: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      data: new FormControl('', [Validators.required]),
      varsta: new FormControl('', [Validators.required]),
      teach: new FormControl('', [Validators.required]),
      payment: new FormControl('', [Validators.required]),
    });

    this.review_details = this.formBuilder.group({
      review: new FormControl('', [Validators.required, Validators.minLength(10)]),
      fname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
  }


  get form() { return this.dateIntroduse.controls }

  get f() { return this.review_details.controls; }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.queryParamMap.get('id');

    this.coursesService.getCourseById(id).subscribe((res) => {
      if (res.status === 200) {
        this.course = res.data;
        this.years = res.years;
      }
      console.log(res);
    });

    this.currentUser = this.authService.getCurrentUser();

    if (this.currentUser) {
      this.loggedIn = true;
      this.currentUser.subscribe(userArray => {
        userArray.forEach(user => {
          this.userId = user.id;
          // va afișa id-ul utilizatorului curent din array
        });
      });
    }

    this.productsService.getReviewsByProductId(id, 'course').subscribe((res) => {
      if (res.status === 200) {
        this.reviews_list = res.data;
      }

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

      this.totalStars = this.stars1 + this.stars2 + this.stars3 + this.stars4 + this.stars5;

    });

    if (this.authService.isAuthenticated()) {
      this.wishlist.getWishlistData(this.userId).subscribe(res => {
        this.courses_from_wishlist = res.data_2;
      })
    }
  }

  isYearSelected = false;

  onYearSelect() {
    console.log(this.form.year.value)
    this.anSelectatBoolean = true;

    this.coursesService.getCitysByIdYear(this.form.year.value).subscribe((res) => {
      // codul de procesare a răspunsului de la API
      if (res.status === 200) {
        this.cities = res.data;
      }
    });
  }

  isCitySelected = false;

  onCitySelect() {
    console.log(this.form.city.value);
    this.orasSelectatBoolean = true;
    this.coursesService.getDatesByIdCity(this.form.city.value).subscribe((res) => {
      // codul de procesare a răspunsului de la API
      if (res.status === 200) {
        this.dates = res.data;
      }
    });
  }

  message$ = this.messageService.message$;

  addToCart(id: any) {
    if (this.authService.isAuthenticated()) {
      this.apasatPeAddToCart = true;
      if (this.dateIntroduse.valid) {
        const year = this.dateIntroduse.value.year;
        const city = this.dateIntroduse.value.city;
        const data = this.dateIntroduse.value.data;
        const teach = this.dateIntroduse.value.teach;
        const payment = this.dateIntroduse.value.payment;
  
        this.coursesService.addCourseToCart(id, this.userId, '1', 'course', year, city, data, teach, payment).subscribe(res => {
          if (res.status === 200) {
            this.messageService.showMessage(res.message, 'success');
            this.authService.increaseNumberOfProducts();
          } else {
            this.messageService.showMessage(res.message, 'error');
          }
          console.log(res);
        });
  
        console.log(year, city, data, teach, payment)
      }
    } else {
      this.messageService.showMessage(
        'Trebuie sa fii conectat sa poti adauga cursuri in cos!',
        'error'
      );
    }
  }

  onVarstaClick() {
    this.varstaBoolean = !this.varstaBoolean;
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
      });
      this.ngOnInit();
    } else {
      this.messageService.showMessage(
        'Trebuie sa fii conectat sa poti adauga cursuri in lista de favorite!',
        'error'
      );
    }
  }

  rating: number;

  GetRating() {
    console.log(this.rating);
  }

  onSubmitReview() {
    if (this.authService.isAuthenticated()) {
      const id = this.activatedRoute.snapshot.queryParamMap.get('id');
      this.productsService
        .addReview(this.userId, this.review_details.value.fname, this.review_details.value.review, this.rating, id, 'course').subscribe((res) => {
          if (res.status === 200) {
            this.reviews = res.data;
            this.messageService.showMessage(res.message, 'success');
            this.ngOnInit();
          } else {
            this.messageService.showMessage(res.message, 'error');
          }
        });
    } else {
      this.messageService.showMessage('Trebuie sa fii conectat sa poti adauga review-uri la cursuri!', 'error');
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
