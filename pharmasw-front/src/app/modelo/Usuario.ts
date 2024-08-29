import { Grupo } from "./enums/Grupo";
import { Status } from "./enums/Status";

export class Usuario{

    nome: string;
    email: string;
    senha: string;
    
    grupo: Grupo;
    status:Status;
}