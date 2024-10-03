export class Cep{

  bairro: string;
  uf: string;
  logradouro: string;
  localidade: string;

  constructor(bairro: string, uf: string, logradouro: string, localidade: string){
    this.bairro = bairro;
    this.uf = uf;
    this.logradouro = logradouro;
    this.localidade = localidade;
  }

}
