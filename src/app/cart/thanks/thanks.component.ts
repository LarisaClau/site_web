import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyAccountService } from 'src/app/services/my-account.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss']
})
export class ThanksComponent {

  order: any[] = [];

  currentUser: any;
  loggedIn: boolean = false;

  userId: any;
  orderId: any;
  id: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: MyAccountService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.queryParamMap.get('id_order');
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

      console.log(this.userId);
    }
  }

  navigateTo() {
    this.router.navigate(['/order-details'], { queryParams: { order_id: this.id } });
  }
}
