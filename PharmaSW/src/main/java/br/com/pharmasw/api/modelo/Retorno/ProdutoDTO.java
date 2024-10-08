package br.com.pharmasw.api.modelo.Retorno;

import br.com.pharmasw.api.modelo.Produto;
import br.com.pharmasw.api.modelo.enums.Status;
import com.fasterxml.jackson.annotation.JsonProperty;

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
