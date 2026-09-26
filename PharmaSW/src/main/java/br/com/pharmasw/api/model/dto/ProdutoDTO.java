package br.com.pharmasw.api.model.dto;

import br.com.pharmasw.api.model.Produto;
import br.com.pharmasw.api.model.enums.Status;

public record ProdutoDTO(
        Long id,
        String nome,
        Integer quantidadeEstoque,
        Double valor,
        Double avaliacao,
        Status status
) {

    public ProdutoDTO(Produto produto) {
        this(produto.getId(),
                produto.getNome(),
                produto.getQuantidadeEstoque(),
                produto.getValor(),
                produto.getAvaliacao(),
                produto.getStatus()
        );
    }

}
