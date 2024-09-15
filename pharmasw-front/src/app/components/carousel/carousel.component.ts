import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  @Input() images: string[] = [];  // Receberá as imagens de outro componente
  currentSlide: number = 0;

  previousSlide() {
    console.log(this.images);

    if (this.currentSlide === 0) {
      this.currentSlide = this.images.length - 1;
    } else {
      this.currentSlide--;
    }
  }

  nextSlide() {
    console.log(this.images);
    if (this.currentSlide === this.images.length - 1) {
      this.currentSlide = 0;
    } else {
      this.currentSlide++;
    }
  }
}
