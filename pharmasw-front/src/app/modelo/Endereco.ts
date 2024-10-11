import { TipoEntrega } from "./enums/TipoEntrega";

export class Endereco {
  id?: number;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  padrao: boolean;
  tipoEndereco: TipoEntrega;
  idClienteCadastro?: number;

  constructor(
    cep: string,
    logradouro: string,
    numero: string,
    bairro: string,
    cidade: string,
    uf: string,
    padrao: boolean,
    tipoEndereco: TipoEntrega,
    complemento?: string,
    idClienteCadastro?: number
  ) {
    this.cep = cep;
    this.logradouro = logradouro;
    this.numero = numero;
    this.bairro = bairro;
    this.cidade = cidade;
    this.uf = uf;
    this.padrao = padrao;
    this.tipoEndereco = tipoEndereco;
    this.complemento = complemento;
    this.idClienteCadastro = idClienteCadastro;
  }
}
