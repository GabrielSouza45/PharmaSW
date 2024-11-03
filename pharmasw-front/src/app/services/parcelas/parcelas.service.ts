import { Injectable } from '@angular/core';
import { Parcelamento } from '../../modelo/Parcelamento';

@Injectable({
  providedIn: 'root'
})
export class ParcelasService {

  private strategies: ParcelasStrategy[] = [
    new Get20(),
    new Get50(),
    new Get100(),
    new Get200(),
    new GetMore200()
  ];

  verificarParcelasDisponiveis(precoFinal: number): Parcelamento[] {
    return this.strategies
      .filter(strategy => precoFinal >= strategy.limite)
      .map(strategy => strategy.calcular(precoFinal));
  }

  getQuantidadeParcelas(precoFinal: number): Parcelamento {

    if (precoFinal <= 20)
      return new Get20().calcular(precoFinal);
    else if (precoFinal <= 50)
      return new Get50().calcular(precoFinal);
    else if (precoFinal <= 100)
      return new Get100().calcular(precoFinal);
    else if (precoFinal <= 200)
      return new Get200().calcular(precoFinal);
    else
      return new GetMore200().calcular(precoFinal);

  }
}

interface ParcelasStrategy {
  calcular(precoTotal: number): Parcelamento;
  limite: number;
}

class FormataDecimal {
  static aplicarCasasDecimais(precoFinal: number): number {
    return parseFloat(precoFinal.toFixed(2));
  }
}

class Get20 implements ParcelasStrategy {
  limite = 20;

  calcular(precoTotal: number): Parcelamento {

    const totalParcelas: number = 1;
    let precoFinal = precoTotal / totalParcelas;
    precoFinal = FormataDecimal.aplicarCasasDecimais(precoFinal);

    return new Parcelamento(
      precoFinal,
      totalParcelas
    );
  }
}

class Get50 implements ParcelasStrategy {
  limite = 50;

  calcular(precoTotal: number): Parcelamento {

    const totalParcelas: number = 2;
    let precoFinal = precoTotal / totalParcelas;
    precoFinal = FormataDecimal.aplicarCasasDecimais(precoFinal);

    return new Parcelamento(
      precoFinal,
      totalParcelas
    );
  }
}

class Get100 implements ParcelasStrategy {
  limite = 100;

  calcular(precoTotal: number): Parcelamento {

    const totalParcelas: number = 5;
    let precoFinal = precoTotal / totalParcelas;
    precoFinal = FormataDecimal.aplicarCasasDecimais(precoFinal);

    return new Parcelamento(
      precoFinal,
      totalParcelas
    );
  }
}

class Get200 implements ParcelasStrategy {
  limite = 200;

  calcular(precoTotal: number): Parcelamento {

    const totalParcelas: number = 7;
    let precoFinal = precoTotal / totalParcelas;
    precoFinal = FormataDecimal.aplicarCasasDecimais(precoFinal);

    return new Parcelamento(
      precoFinal,
      totalParcelas
    );
  }
}

class GetMore200 implements ParcelasStrategy {
  limite = 250;

  calcular(precoTotal: number): Parcelamento {

    const totalParcelas: number = 10;
    let precoFinal = precoTotal / totalParcelas;
    precoFinal = FormataDecimal.aplicarCasasDecimais(precoFinal);

    return new Parcelamento(
      precoFinal,
      totalParcelas
    );
  }
}


