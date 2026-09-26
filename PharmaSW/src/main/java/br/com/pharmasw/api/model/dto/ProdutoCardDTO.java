package br.com.pharmasw.api.model.dto;

public record ProdutoCardDTO(
        byte[] imagemPrincipal,
        ProdutoDTO produto
) {}
