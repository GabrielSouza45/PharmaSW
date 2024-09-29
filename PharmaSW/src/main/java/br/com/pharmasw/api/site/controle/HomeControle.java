package br.com.pharmasw.api.site.controle;

import br.com.pharmasw.api.modelo.Filtros;
import br.com.pharmasw.api.site.servico.SiteProdutoServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/home-controle")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class HomeControle {

    @Autowired
    private SiteProdutoServico produtoServico;


    @GetMapping("/listar-produtos-card")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    // -> Permite que qualquer usuario acesse o endpoint -> SITE
    public ResponseEntity<?> listarProdutos() {

        return produtoServico.listarProdutosCard();

    }

    @PostMapping("/listar-produto")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> listarProduto(@RequestBody Filtros filtro) {

        return produtoServico.listarProdutoPorId(filtro);

    }
}
