import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyAccountService } from 'src/app/services/my-account.service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit {
  url : string = '';
  currentUser: any;
  loggedIn : boolean = false;

  constructor(private router: Router,
              private authService: MyAccountService) {
  }

  ngOnInit(): void {
    this.url = this.router.url;
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser)

    this.authService.getCurrentUser().subscribe(
      (user) => {
        this.currentUser = user;
        console.log(this.currentUser);
        const asdas = JSON.parse(localStorage.getItem('authToken'));
        if(this.currentUser) {
          this.loggedIn = true;
        }
      }
    );
  }
}
