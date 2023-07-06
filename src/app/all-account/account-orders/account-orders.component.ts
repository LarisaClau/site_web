import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyAccountService } from 'src/app/services/my-account.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.scss']
})
export class AccountOrdersComponent {
  orders: any[] = [];
  searchValue : string = '';
  ordersCopy: any[] = [];

  
  currentUser: any;
  loggedIn: boolean = false;

  userId: any;

  constructor(
    private router: Router,
    private authService: MyAccountService,
    private orderService: OrderService,
    private cd : ChangeDetectorRef,
    ) {
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
      // Apelăm metoda din OrderService pentru a primi toate orderele utilizatorului
      this.orderService.getOrdersList(this.userId).subscribe(res => {
        if (res.status === 200) {
          this.orders = res.data;
          this.ordersCopy = JSON.parse(JSON.stringify(res.data));
        }
        console.log(res);
      });
    }
  }

  navigateToProduct(orderId) {
    this.router.navigate(['/order-details'], { queryParams: { order_id: orderId } });
  }

  onSearchChange(event: any) {
    this.orders = [];
    this.orders = this.ordersCopy.slice();
    if(this.searchValue == '') {
      this.orders = this.ordersCopy.slice();
    } else {
      this.orders = this.orders.filter(order => order.id_order.includes(this.searchValue));
    }
  }


  //Functie cu ajutorul careia pot introduce la search doar numere
  onKeyDown(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
    const isNumericInput = /^[0-9]+$/.test(event.key);

    if (!isNumericInput && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
}
