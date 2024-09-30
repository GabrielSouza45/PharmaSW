import { Injectable } from '@angular/core';
import { Produto } from '../../modelo/Produto';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  generateStars(produto: Produto): string[] {
    const fullStars = Math.floor(produto.avaliacao); // Número de estrelas cheias
    const hasHalfStar = produto.avaliacao % 1 !== 0; // Verifica se há meia estrela
    const totalStars = 5; // Total de estrelas que você quer mostrar

    // Cria um array com as classes das estrelas
    let stars = Array(totalStars).fill('bi-star-fill'); // Estrelas cheias

    // Ajusta o último item se houver uma meia estrela
    if (hasHalfStar) {
      stars[fullStars] = 'bi-star-half'; // Meia estrela
    }

    // Ajusta as estrelas restantes para estrela vazia
    if (fullStars < totalStars) {
      stars.fill('bi-star', fullStars + (hasHalfStar ? 1 : 0)); // Estrela vazia
    }
    return stars;
  }
}
