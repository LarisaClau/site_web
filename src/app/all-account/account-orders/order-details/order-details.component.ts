import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyAccountService } from 'src/app/services/my-account.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent {
  order: any[] = [];
  orderDetails: any[] = [];


  currentUser: any;
  loggedIn: boolean = false;
  curierPrice : any = 0;
  userId: any;
  id_order: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: MyAccountService,
    private orderService: OrderService
  ) {}

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

      console.log(this.userId);
    }

     this.id_order = this.activatedRoute.snapshot.queryParamMap.get('order_id');

   
     this.orderService.getOrderById(this.userId, this.id_order).subscribe(res => {
       if (res.status === 200) {
         this.order = res.data;
         this.orderDetails = res.order[0];
        if(res.order[0].delivery_method == 'Livrare prin curier') {
          this.curierPrice = 15;
        }

        if(res.order[0].delivery_method == 'Ridicare de la sediu') {
          this.curierPrice = 5;
        }
       }
       console.log(res);
     });
  }
}
