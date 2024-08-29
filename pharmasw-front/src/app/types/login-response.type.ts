import { Grupo } from "../modelo/enums/Grupo"

export type LoginResponse = {
    token: string,
    nome: string,
    grupo: Grupo
}