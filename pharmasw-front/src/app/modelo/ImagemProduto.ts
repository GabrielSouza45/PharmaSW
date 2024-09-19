import { Status } from "./enums/Status";
import { Produto } from "./Produto";

export class ImagemProduto{
  id: number;
  status: Status;
  nomeOriginal: string;
  caminho: string;
  principal: boolean;
  imagem: string[];
  produto: Produto;
  arquivo: File;
}
