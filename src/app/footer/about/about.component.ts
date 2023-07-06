import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  text1Visible: boolean = false;
  text2Visible: boolean = false;
  text3Visible: boolean = false;

  // vizibilitate texte
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const text1Element = document.getElementById('first');
    const text2Element = document.getElementById('second');
    const text3Element = document.getElementById('third');

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
