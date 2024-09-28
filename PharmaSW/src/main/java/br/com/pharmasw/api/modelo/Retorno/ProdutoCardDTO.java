package br.com.pharmasw.api.modelo.Retorno;

public record ProdutoCardDTO(
        byte[] imagemPrincipal,
        ProdutoDTO produto
) {}
