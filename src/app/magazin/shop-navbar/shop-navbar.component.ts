import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsCategoryService } from 'src/app/services/products_category.service';
import { ProductsSubcategoryService } from 'src/app/services/products_subcategory.service';


@Component({
  selector: 'app-shop-navbar',
  templateUrl: './shop-navbar.component.html',
  styleUrls: ['./shop-navbar.component.scss']
})
export class ShopNavbarComponent {
  category: any[] = [];
  subcategory: any[] = [];

  constructor(private productsCategoryService : ProductsCategoryService,
              private productsSubcategoryService : ProductsSubcategoryService,
              private router: Router,) {
  }

  ngOnInit(): void {
    this.productsCategoryService.getCategoryData().subscribe(res => {
      if(res.status === 200) {
        this.category = res.data;
      }
      console.log(res);
    });

    this.productsSubcategoryService.getSubcategoryData().subscribe(res => {
      if(res.status === 200) {
        this.subcategory = res.data;
      }
      console.log(res);
    });
  }

  hasSubcategories(category: any): boolean {
    return this.subcategory.some(subcategory => subcategory.id_category === category.id_category);
  }

  navigateToCategory(idCategory) {
    this.router.navigate(['/products'], { queryParams: { id_category: idCategory } });
    console.log(idCategory);
  }

   navigateToSubCategory(idSubcategory) {
     this.router.navigate(['/products'], { queryParams: { id_subcategory: idSubcategory } });
   }
}
