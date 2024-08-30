import { Grupo } from "./enums/Grupo";
import { Status } from "./enums/Status";

export class Usuario{

    nome: string;
    email: string;
    senha: string;
    cpf: number;

    grupo: Grupo;
    status:Status;

    dataIni: Date;
    dataAlt: Date;
    dataFim: Date;

}
