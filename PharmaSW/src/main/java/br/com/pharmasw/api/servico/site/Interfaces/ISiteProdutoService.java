package br.com.pharmasw.api.servico.site.Interfaces;

import br.com.pharmasw.api.modelo.Produto;
import br.com.pharmasw.api.modelo.Retorno.ProdutoDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ISiteProdutoService {

    public ResponseEntity<?> listarProdutosCard();

    public ResponseEntity<?> listarProdutosCardBusca(String busca);

    public List<ProdutoDTO> getProdutosDTO(List<Produto> produtos);
}
