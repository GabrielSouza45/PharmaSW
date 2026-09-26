package br.com.pharmasw.api.service.site.Interfaces;

import br.com.pharmasw.api.model.Filtros;
import org.springframework.http.ResponseEntity;

public interface ISiteProdutoService {

    public ResponseEntity<?> listarProdutosCard();

    public ResponseEntity<?> listarProdutosCardBusca(String busca);

    public ResponseEntity<?> listarProdutoPorId(Filtros filtro);
}
