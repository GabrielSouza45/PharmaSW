package br.com.pharmasw.api.modelo.Retorno;

import br.com.pharmasw.api.modelo.Produto;
import br.com.pharmasw.api.modelo.enums.Status;
import com.fasterxml.jackson.annotation.JsonProperty;

public record ProdutoDTO(
        Long id,
        String nome,
        String fabricante,
        @JsonProperty("Quantidade Estoque")
        Integer quantidadeEstoque,
        Double valor,
        Status status
) {

    public ProdutoDTO(Produto produto) {
        this(produto.getId(),
                produto.getNome(),
                produto.getFabricante(),
                produto.getQuantidadeEstoque(),
                produto.getValor(),
                produto.getStatus()
        );
    }

}
