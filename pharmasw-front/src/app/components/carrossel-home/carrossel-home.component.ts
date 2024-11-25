import { Component, Input } from '@angular/core';
import { ImagemProduto } from '../../modelo/ImagemProduto';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrossel-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrossel-home.component.html',
  styleUrl: './carrossel-home.component.css'
})
export class CarrosselHomeComponent {
  @Input() images: ImagemProduto[] = []; // Receberá as imagens de outro componente
  currentSlide: number = this.images.length;

  constructor(private router: Router) { }

  atualizaSlide() {
    // Garantir que o currentSlide não esteja fora dos limites válidos
    if (this.images.length === 0) {
      this.currentSlide = 0;
    } else if (this.currentSlide >= this.images.length) {
      this.currentSlide = this.images.length - 1;
    }
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  selecionaProdutoImg(posicao: number) {
    switch (posicao) {
      case 0: {
        this.router.navigate(['/produto/' + "Darrow Actine"]);
        break;
      }
      case 1: {
        this.router.navigate(['/produto/' + "Huggies Supreme Care"]);
        break;
      }
      case 2: {
        this.router.navigate(['/produto/' + "Neosaldina"]);
        break;
      }
      case 3: {
        this.router.navigate(['/produto/' + "Novalgina"]);
        break;
      }
      case 4: {
        this.router.navigate(['/produto/' + "Shampoo Clear Men Sports - CR7"]);
        break;
      }
      case 5: {
        this.router.navigate(['/produto/' + "Roxx Energy"]);
        break;
      }
      default:
        break;

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
