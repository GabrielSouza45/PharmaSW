package br.com.pharmasw.api.modelo.Retorno;

import br.com.pharmasw.api.modelo.Produto;
import br.com.pharmasw.api.modelo.enums.Status;

public record ProdutoDTO(
        Long id,
        String nome,
        String categoria,
        Status status,
        Double valor,
        Double peso
) {

    public ProdutoDTO(Produto produto) {
        this(produto.getId(),
                produto.getNome(),
                produto.getCategoria(),
                produto.getStatus(),
                produto.getValor(),
                produto.getPeso());
    }

}
