import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { StatisticsService } from '../services/statistics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private statisticsService: StatisticsService,
    private elementRef: ElementRef,
    private renderer: Renderer2) { }

  num_products: number;
  num_subcategories: number;
  num_trainers: number;
  num_cities: number;
  num_users: number;
  num_orders: number;
  num_appointments: number;
  num_courses: number;

  text1Visible: boolean = false;
  text2Visible: boolean = false;
  text3Visible: boolean = false;

  ngOnInit(): void {
    this.statisticsService.getNumOfProducts().subscribe(res => {
      if (res.status === 200) {
        this.num_products = res.data;
      }
      console.log(res);
    });

    this.statisticsService.getNumOfSubcategories().subscribe(res => {
      if (res.status === 200) {
        this.num_subcategories = res.data;
      }
      console.log(res);
    });

    this.statisticsService.getNumOfTrainers().subscribe(res => {
      if (res.status === 200) {
        this.num_trainers = res.data;
      }
      console.log(res);
    });

    this.statisticsService.getNumOfCities().subscribe(res => {
      if (res.status === 200) {
        this.num_cities = res.data;
      }
      console.log(res);
    });

    this.statisticsService.getNumOfUsers().subscribe(res => {
      if (res.status === 200) {
        this.num_users = res.data;
      }
      console.log(res);
    });

    this.statisticsService.getNumOfOrders().subscribe(res => {
      if (res.status === 200) {
        this.num_orders = res.data;
      }
      console.log(res);
    });

    this.statisticsService.getNumOfAppointments().subscribe(res => {
      if (res.status === 200) {
        this.num_appointments = res.data;
      }
      console.log(res);
    });

    this.statisticsService.getNumOfCourses().subscribe(res => {
      if (res.status === 200) {
        this.num_courses = res.data;
      }
      console.log(res);
    });
  }

// vizibilitate texte
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const text1Element = document.getElementById('primul_text');
    const text2Element = document.getElementById('aldoilea_text');
    const text3Element = document.getElementById('altreilea_text');

    const text1Pos = text1Element.offsetTop;
    const text2Pos = text2Element.offsetTop;
    const text3Pos = text3Element.offsetTop;

    const scrollPos = window.pageYOffset + window.innerHeight;

    if (scrollPos > text1Pos && !this.text1Visible) {
      text1Element.classList.add('visible');
      this.text1Visible = true;
    }

    if (scrollPos > text2Pos && !this.text2Visible) {
      text2Element.classList.add('visible');
      this.text2Visible = true;
    }

    if (scrollPos > text3Pos && !this.text3Visible) {
      text3Element.classList.add('visible');
      this.text3Visible = true;
    }
  }
}
