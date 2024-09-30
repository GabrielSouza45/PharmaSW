import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ImagemProduto } from '../../modelo/ImagemProduto';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  @Input() images: ImagemProduto[] = []; // Receberá as imagens de outro componente
  @Input() acoes: any[] = [];
  currentSlide: number = this.images.length;

  atualizaSlide() {
    // Garantir que o currentSlide não esteja fora dos limites válidos
    if (this.images.length === 0) {
      this.currentSlide = 0;
    } else if (this.currentSlide >= this.images.length) {
      this.currentSlide = this.images.length - 1;
    }
  }

  previousSlide() {
    if (this.images) {
      if (this.currentSlide === 0) {
        this.currentSlide = this.images.length - 1;
      } else {
        this.currentSlide--;
      }
    }
  }

  nextSlide() {
    if (this.images) {
      if (this.currentSlide === this.images.length - 1) {
        this.currentSlide = 0;
      } else {
        this.currentSlide++;
      }
    }
  }
}
