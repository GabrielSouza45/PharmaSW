package br.com.pharmasw.api.modelo.Retorno;

import br.com.pharmasw.api.modelo.enums.Grupo;

public record AuthDTO(String token, String nome, Grupo grupo, Long id) {
}
