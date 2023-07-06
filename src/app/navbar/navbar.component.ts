import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { MyAccountService } from '../services/my-account.service';
import { NavbarService } from '../services/navbar.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  toggleUserBoolean: boolean = false;
  currentUser: any;
  loggedIn: boolean = false;
  userId: any;
  count_products: number = 0;
  url : string;
  numarProduse : number = 0;
  searchValue : string;
  booleanForSearch: boolean = false;
  zeroProductsMessage : string = '';
  produseCautate : any[] = [];
  lungimeLista : number = 0;

  constructor(private authService: MyAccountService,
    private cd: ChangeDetectorRef,
    private navbarService: NavbarService,
    private router: Router) {
      this.url = this.router.url;
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
    this.authService.getCurrentUser().subscribe(
      (user) => {
        this.currentUser = user;
        console.log(this.currentUser);
        const asdas = JSON.parse(localStorage.getItem('authToken'));
        if (this.currentUser) {
          this.loggedIn = true;
          this.navbarService.NumofProductsFromCart(this.userId).subscribe(res => {
            if (res.status === 200) {
              this.count_products = res.data;
              this.authService.setNumberOfProducts(this.count_products[0].total_products);
      
             if(this.count_products[0].total_products == null) {
              this.count_products[0].total_products = 0;
              this.authService.setNumberOfProducts(0);
             }
            }
          });
        } 
      }
    );
    this.cd.markForCheck();

    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);

    if (this.currentUser) {
      this.loggedIn = true;

      this.currentUser.subscribe(userArray => {
        userArray.forEach(user => {
          this.userId = user.id;
          console.log(this.userId);
        });
      });
    }

    this.navbarService.NumofProductsFromCart(this.userId).subscribe(res => {
      if (res.status === 200) {
        this.count_products = res.data;
        this.authService.setNumberOfProducts(this.count_products[0].total_products);

       if(this.count_products[0].total_products == null) {
        this.count_products[0].total_products = 0;
        this.authService.setNumberOfProducts(0);
       }
      }
    });


    this.authService.numberOfProductsSubject.subscribe(numberOfNotifications => {
      this.numarProduse = numberOfNotifications;
      this.cd.markForCheck();
      this.cd.detectChanges();
    })
  }

  toggleUser() {
    this.toggleUserBoolean = !this.toggleUserBoolean;
  }

  logout() {
    this.authService.logout();
    this.currentUser = null;
  }

  onSearchChange(event: any) {
    this.zeroProductsMessage = '';

    if(this.searchValue.length <= 2) {
      console.log('lungimie minima 2')
      this.booleanForSearch = false;
    } else {
      this.navbarService.searchProduct(this.searchValue).subscribe((res) => {
        console.log(res)
        this.booleanForSearch = true;
       if(res.status === 200) {
        this.produseCautate = res.data;
        this.lungimeLista = this.produseCautate.length;
       } else if(res.status === 100) {
         this.zeroProductsMessage = res.message;
       }
      })
    }
  }

  navigateToProduct(id) {
    this.booleanForSearch = false;
    this.searchValue = '';
    this.navbarService.setIdForProductPage(id);
    this.router.navigate(['/product'], { queryParams: { id: id } });
  }

  calculateHeight() {
    if(this.lungimeLista > 2) {
      return 258;
    } else {
      return this.lungimeLista * 86;
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const searchResultsElement = document.querySelector('.searchResults');
    if (searchResultsElement && !searchResultsElement.contains(event.target as Node)) {
      this.booleanForSearch = false; // Setează boolean-ul pe false când se dă clic în afara div-ului
      this.zeroProductsMessage = '';
      this.searchValue = '';
    }

    const searchResultsElementNoData = document.querySelector('.searchResultsNoData');
    if (searchResultsElementNoData && !searchResultsElementNoData.contains(event.target as Node)) {
      this.booleanForSearch = false; // Setează boolean-ul pe false când se dă clic în afara div-ului
      this.searchValue = '';
      this.zeroProductsMessage = '';
    }
  }

  
}
