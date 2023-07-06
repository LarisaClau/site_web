import { Component, OnInit } from '@angular/core';
import { TehnicianFiltersService } from '../services/tehnician_filters.service';
import { TehnicianFilterPriceService } from '../services/tehnician_filter_price.service';
import { Router } from '@angular/router';

export interface Tehnicians {  
  status: number;
  message: string;
  data: ArrayTehnicians;
}

export interface ArrayTehnicians {
  price_range: string;
  address: string;
}

@Component({
  selector: 'app-programari-unghii',
  templateUrl: './programari-unghii.component.html',
  styleUrls: ['./programari-unghii.component.scss'],
})
export class ProgramariUnghiiComponent implements OnInit {
  tehnicians: any[] = [];
  orase: any[] = [];
  tehniciansCopy: any[] = [];
  prices: number[] = [];
  numarDolari: number = 3;
  arrayDolari: number[] = [];
  arrayDolariCopy: number[] = [];
  selectedPrice : string = 'Pret';
  selectedCity : string = 'Locatie';



  constructor(private tehnicianFiltersService: TehnicianFiltersService,
    private router: Router) { }

  ngOnInit(): void {

    this.tehnicianFiltersService.getTehnicianData().subscribe((res:any) => {
      if (res.status === 200) {
        this.tehnicians = res.data;
        this.tehniciansCopy = res.data;

        for (let i = 0; i < res.data.length; i++) {
          this.arrayDolari.push(Number(res.data[i].price_range));
          this.arrayDolariCopy.push(Number(res.data[i].price_range));
        }

        this.orase = [...new Set(res.data.map(product => product.city))];
      }
      
      console.log(res);
    });
  }
  generateArray(num: number): number[] {
    return Array(num).fill(0).map((i) => i + 1);
  }

  showDropdownPrice: boolean;
  selectedOptionPrice: string;

  selectOptionPrice(numarDolari: any) {
    this.selectedCity = 'Locatie';
    if(numarDolari == 1) {
      this.selectedPrice = '$';
    }
    if(numarDolari == 2) {
      this.selectedPrice = '$$';
    }
    if(numarDolari == 3) {
      this.selectedPrice = '$$$';
    }
    if(numarDolari == 4) {
      this.selectedPrice = '$$$$';
    }
    if(numarDolari == 5) {
      this.selectedPrice = '$$$$$';
    }
    if(numarDolari == 'Toate') {
      this.selectedPrice = 'Pret';
    }

    this.tehnicians = [];
    this.arrayDolari = [];
    this.tehnicians = this.tehniciansCopy.slice();
    this.arrayDolari = this.arrayDolariCopy.slice();
    if(numarDolari != 'Toate') {
       this.arrayDolari = [];
       this.tehnicians = this.tehnicians.filter(tehnician => tehnician.price_range === numarDolari);
       for (let i = 0; i < this.tehnicians.length; i++) {
        this.arrayDolari.push(Number(this.tehnicians[i].price_range));
      }
    }
    this.showDropdownPrice = false;
  }

  showDropdown: boolean;
  selectedOption: string;

  selectOptionCity(orasSelectat: any) {
   this.selectedPrice = 'Pret';
   this.showDropdown = false;
   this.tehnicians = [];
   this.tehnicians = this.tehniciansCopy.slice();
   if(orasSelectat != 'Toate') {
    this.tehnicians = this.tehnicians.filter(tehnician => tehnician.city === orasSelectat);
    this.selectedCity = orasSelectat;
  } else {
    this.selectedCity = 'Locatie';
  }
  }

  navigateToTehnician(id_tehnician) {
    this.router.navigate(['/programare'], { queryParams: { id_tehnician: id_tehnician } });
  }
}
