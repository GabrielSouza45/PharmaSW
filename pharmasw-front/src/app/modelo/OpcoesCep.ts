export class OpcoesCep{
  id: number;
  prazo: string;
  preco: number;

  constructor(id: number, prazo: string, preco: number){
    this.id = id;
    this.prazo = prazo;
    this.preco = preco;
  }
}
