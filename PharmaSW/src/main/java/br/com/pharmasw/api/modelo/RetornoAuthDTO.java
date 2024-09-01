package br.com.pharmasw.api.modelo;

import br.com.pharmasw.api.modelo.enums.Grupo;

public record RetornoAuthDTO(String token, String nome, Grupo grupo) {
}
