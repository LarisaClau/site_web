import { Component, Input } from '@angular/core';

interface carouselImage {
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-carousel-tehnician',
  templateUrl: './carousel-tehnician.component.html',
  styleUrls: ['./carousel-tehnician.component.scss']
})
export class CarouselTehnicianComponent {

  @Input() images: carouselImage[] = []
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input () sliderInterval = 4000; //default to 3s
 
  selectedIndex = 0;

  ngOnInit(): void {
    if(this.autoSlide) {
      this.autoSlideImages();
    }
  }

  //changes slide in every 3 second
  autoSlideImages(): void {
    setInterval(() => {
      this.onNextClick();
    }, this.sliderInterval);
  }

  //sets index of image  on dot click
  selectImage(index: number): void{
    this.selectedIndex = index;
  }

  onPrevClick(): void {
    if(this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  onNextClick(): void {
    if(this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

}
