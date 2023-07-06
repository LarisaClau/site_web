import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartDeliveryService } from 'src/app/services/cart_delivery.service';
import { MessageService } from 'src/app/services/message.service';
import { MyAccountService } from 'src/app/services/my-account.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductsService } from 'src/app/services/product.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent {
  currentUser: any;
  loggedIn: boolean = false;
  selectedAddress : string = '';

  userId: any;

  cart: any[] = [];
  cartCourse: any[] = [];

  totalCourses : number = 0;
  totalProducts: number = 0;
  total: number;
  totalAll: number;
  totalWithVoucher: number;
  totalWithVoucherCopy : number;
  pretLivrare : number = 0;
  orderID : number;

  totalQuantityCourses: number;
  totalQuantityProducts: number;
  totalQuantity: number;

  deliveryMethods: any[] = [];

  dateIntroduse: FormGroup;

  orderButton : boolean = false;

  message$ = this.messageService.message$;

  constructor(
    private cartService: CartService,
    private authService: MyAccountService,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private messageService: MessageService,
    private router: Router,

  ) {
    this.dateIntroduse = this.formBuilder.group({
    delivery: new FormControl('', [Validators.required]),
    payment: new FormControl('', [Validators.required]),
    shippingAddress: new FormControl('', [Validators.required]),
    bill: new FormControl('', [Validators.required]),
    shippingAddressBill: new FormControl(''),
  });}

  get form () {return this.dateIntroduse.controls}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);

    if (this.currentUser) {
      this.loggedIn = true;

      this.currentUser.subscribe((userArray) => {
        userArray.forEach((user) => {
          this.userId = user.id;
          console.log(this.userId); // va afișa id-ul utilizatorului curent din array
        });
      });
    }

    // Apelăm metoda din CartService pentru a primi doar produsele din cart-ul utilizatorului curent
    this.cartService.getCartData(this.userId).subscribe(res => {
      if (res.status === 200) {
        this.cart = res.data;
        this.cartCourse = res.data_2;

        this.totalQuantityCourses = 0;
        this.totalQuantityProducts = 0;
        this.totalQuantity = 0;

        for(let i=0; i< this.cartCourse.length; i++) {
          this.totalQuantityCourses = this.totalQuantityCourses + Number(this.cartCourse[i].quantity);
        }

        for(let i=0; i< this.cart.length; i++) {
          this.totalQuantityProducts = this.totalQuantityProducts + Number(this.cart[i].quantity);
        }

        this.totalQuantity =  this.totalQuantityProducts + this.totalQuantityCourses;

         //Calculam totalul pentru cart
         for(let i=0; i< this.cartCourse.length; i++) {
           this.totalCourses = this.totalCourses + Number(this.cartCourse[i].price_total);
         }

         for(let i=0; i< this.cart.length; i++) {
           this.totalProducts = this.totalProducts + Number(this.cart[i].price_total);
         }

         this.total = this.totalProducts + this.totalCourses;
         this.totalWithVoucher = this.total;
         this.totalWithVoucherCopy = this.total;

         // total cu livrarea
         if(this.dateIntroduse.value.delivery == 'Livrare prin curier'){
          this.totalAll = this.total + 15;
          
          
         }else if(this.dateIntroduse.value.delivery == 'Ridicare de la sediu'){
          this.totalAll = this.total + 5;
         }
         console.log(this.totalAll);

      }

      this.cartService.getTotalWithVoucher().subscribe(voucher => {
        if(voucher ) { 
        this.totalWithVoucher = voucher;
        this.totalWithVoucherCopy = voucher;
        }
      })
  
    });
  }
    
 sendOrder() {

if(this.dateIntroduse.value.shippingAddressBill && this.dateIntroduse.value.bill == 'Adauga o adresa alternativa') {
 this.selectedAddress = this.dateIntroduse.value.shippingAddressBill;
} else {
  this.selectedAddress = this.dateIntroduse.value.shippingAddress;
}


// Daca selecteaza acceasi ca adresa de livrare
  if(this.dateIntroduse.value.bill == 'Aceeasi ca adresa de livrare') {
    // trimitem pentru billing address valoarea shippingAddress
    const shippingAddressBill = this.dateIntroduse.value.shippingAddress;
    this.orderService.sendOrder(this.userId, this.dateIntroduse.value.delivery, this.dateIntroduse.value.payment, this.dateIntroduse.value.shippingAddress, shippingAddressBill, this.totalWithVoucher).subscribe(res => {
      if(res.status === 200) {
        this.router.navigate(['/thanks'], { queryParams: { id_order: res.idOrder } });
      } else {
        this.messageService.showMessage(res.message, 'error');
      }
      console.log("ss")
      console.log(res)
    });
  } else if(this.dateIntroduse.value.bill == 'Adauga o adresa alternativa') {
    // trimitem pentru billing address valoarea shippingAddressBill
    const shippingAddressBill = this.dateIntroduse.value.shippingAddressBill;
    this.orderService.sendOrder(this.userId, this.dateIntroduse.value.delivery, this.dateIntroduse.value.payment, this.dateIntroduse.value.shippingAddress, shippingAddressBill, this.totalWithVoucher).subscribe(res => {
      if(res.status === 200) {
        this.router.navigate(['/thanks'], { queryParams: { id_order: res.idOrder } });
      } else {
        this.messageService.showMessage(res.message, 'error');
      }
      console.log("ss")
      console.log(res)
    });
  }
 }

 setarePretLivrare(pret : any) {
  this.pretLivrare = pret;
  this.totalWithVoucher = this.totalWithVoucherCopy + this.pretLivrare;
 }
}
