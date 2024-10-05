package br.com.pharmasw.api.modelo.Retorno;

import br.com.pharmasw.api.modelo.enums.Grupo;

public record AuthDTO<T>(String token, String nome, T grupo, Long id) {
}
