package br.com.pharmasw.api.model.dto;

public record AuthDTO<T>(String token, String nome, T grupo, Long id) {
}
