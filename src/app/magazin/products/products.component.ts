import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { MyAccountService } from 'src/app/services/my-account.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductsCategoryService } from 'src/app/services/products_category.service';
import { ProductsSubcategoryService } from 'src/app/services/products_subcategory.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  products: any[] = [];
  productsCopy: any[] = [];
  products_from_wishlist: any[] = [];
  subcategory: any[] = [];
  stoc: any[] = [];
  brands: any[] = [];
  products_bestseller: any[] = [];
  selectedBrands: any[] = [];
  userId: any;
  loggedIn: boolean = false;
  currentUser: any;
  category_title: any;

  totalProducts: any = 0;

  constructor(
    private productsService: ProductsService,
    private productsCategoryService: ProductsCategoryService,
    private productsSubcategoryService: ProductsSubcategoryService,
    private router: Router,
    private wishlist: WishlistService,
    private cd: ChangeDetectorRef,
    private authService: MyAccountService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const id = params['id_category'];
      const id_subcategory = params['id_subcategory'];
      if (id) {
        // Afisam la filtrare doar subcategoriile de la categorie
        this.productsSubcategoryService.getSubcategoryData().subscribe((res) => {
            if (res.status === 200) {
              this.subcategory = res.data;
              for (let i = 0; i < this.subcategory.length; i++) {
                if (this.subcategory[i].id_category != id) {
                  this.subcategory.splice(i, 1); // elimina subcategoria de la pozitia i
                  i--; // deoarece am eliminat un element, trebuie sa decrementam indexul
                }
              }
            }
          });

        this.productsCategoryService.getProductByIdCategory(id).subscribe((res) => {
            if (res.status === 200) {
              this.products = JSON.parse(JSON.stringify(res.data));
              this.productsCopy = JSON.parse(JSON.stringify(res.data));
              this.totalProducts = this.products.length;
              this.category_title = res.category_name[0].name;
            } else {
              this.products = [];
              this.totalProducts = 0;
            }
          });
      } else if (id_subcategory) {
        // Afisam la filtrare doar subcategoriile de la categorie
        this.productsSubcategoryService.getSubcategoryData().subscribe((res) => {
            if (res.status === 200) {
              this.subcategory = res.data;
              for (let i = 0; i < this.subcategory.length; i++) {
                if (this.subcategory[i].id_subcategory != id_subcategory) {
                  this.subcategory.splice(i, 1); // elimina subcategoria de la pozitia i
                  i--; // deoarece am eliminat un element, trebuie sa decrementam indexul
                }
              }
            }
          });

        this.productsSubcategoryService.getProductByIdSubcategory(id_subcategory).subscribe((res) => {
            if (res.status === 200) {
              this.products = JSON.parse(JSON.stringify(res.data));
              this.productsCopy = JSON.parse(JSON.stringify(res.data));
              this.category_title = res.category_name[0].name;
              this.totalProducts = this.products.length;
            } else {
              this.products = [];
              this.totalProducts = 0;
            }
          });
      }
    });

    this.currentUser = this.authService.getCurrentUser();

    if (this.currentUser) {
      this.loggedIn = true;
      this.currentUser.subscribe((userArray) => {
        userArray.forEach((user) => {
          this.userId = user.id;
        });
      });
    }

    this.productsService.getBrandsData().subscribe((res) => {
      if (res.status === 200) {
        this.brands = res.data;
      }
    });

    if (this.authService.isAuthenticated()) {
      this.wishlist.getWishlistData(this.userId).subscribe(res => {
        this.products_from_wishlist = res.data;
      });  
    }
  }

  finalQuantity: number = 1;

  AddCart(id: any) {
    if (this.authService.isAuthenticated()) {
      this.productsService
      .addProductCart(id, this.userId, this.finalQuantity, 'product')
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
      this.messageService.showMessage(
        'Trebuie sa fii conectat sa poti adauga produse in cos!',
        'error'
      );
    }
  }

  showRightFilters: boolean = false;

  heart = true;

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
        'Trebuie sa fii conectat pentru a putea adauga produse in lista de dorinte!',
        'error'
      );
    }
  }

  ////////// sortare dupa
  showDropdown: boolean;
  selectedOption: string;

  selectOption(option: string) {
    this.selectedOption = option;
    this.showDropdown = false;

    console.log('selectOption', option);
    if (option === 'Sorteaza dupa - pret crescator') {
      console.log('Sortare lista de produse dupa pret crescator');
      this.products = this.products.sort((a, b) => a.price - b.price);
    } else if (option === 'Sorteaza dupa - pret descrescator') {
      console.log('Sortare lista de produse dupa pret descrescator:');
      this.products = this.products.sort((a, b) => b.price - a.price);
    } else if (option === 'Sorteaza dupa - cele mai noi') {
      console.log('Sorteaza lista de produse dupa cele mai noi:');
      this.products = this.products.sort(
        (a, b) =>
          new Date(b.add_date).getTime() - new Date(a.add_date).getTime()
      );
    }
  }

  showFilters: boolean;

  sliderValues: number[] = [0, 500];
  startValue: number = 0;
  endValue: number = 500;

  navigateToProduct(id) {
    this.router.navigate(['/product'], { queryParams: { id: id } });
  }

  navigateToSubCategory(idSubcategory) {
    this.router.navigate(['/products'], {
      queryParams: { id_subcategory: idSubcategory },
    });
  }

  filterByPrice() {
    this.products = [];
    this.products = this.productsCopy.slice();
    console.log(this.productsCopy);
    for (let i = 0; i < this.products.length; i++) {
      if (
        this.products[i].price < this.startValue ||
        this.products[i].price > this.endValue
      ) {
        this.products.splice(i, 1); // elimina de la pozitia i
        i--; // deoarece am eliminat un element, trebuie sa decrementam indexul
      }
    }
  }

  filterByBrand(name) {
    let boolean = false;
   for (let i=0; i<this.selectedBrands.length; i++) {
    if(this.selectedBrands[i] == name) {
      this.selectedBrands.splice(i, 1)
      boolean = true;
    }
   }

   if(boolean == false ) {
    this.selectedBrands.push(name);
   }
    this.products = [];
    this.products = this.productsCopy.slice();
    this.products = this.products.filter(product => this.selectedBrands.includes(product.id_brand));
    if(this.selectedBrands.length == 0 ) {
      this.products = [];
      this.products = this.productsCopy.slice();
    }
  }

  verifiyIfWishlist(idProduct) {
    if (this.authService.isAuthenticated()) {
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
