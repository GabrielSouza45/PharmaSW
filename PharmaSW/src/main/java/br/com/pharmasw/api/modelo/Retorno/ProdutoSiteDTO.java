package br.com.pharmasw.api.modelo.Retorno;

import br.com.pharmasw.api.modelo.Produto;

import java.util.List;

public record ProdutoSiteDTO(
        String nome,
        String fabricante,
        String categoria,
        String descricao,
        Double valor,
        Double peso,
        Double avaliacao,
        Integer quantidadeEstoque,
        List<byte[]> imagens
) {
    public ProdutoSiteDTO(Produto produto) {
        this(produto.getNome(),
                produto.getFabricante(),
                produto.getCategoria(),
                produto.getDescricao(),
                produto.getValor(),
                produto.getPeso(),
                produto.getAvaliacao(),
                produto.getQuantidadeEstoque(),
                produto.getImagens()
        );
    }
}
