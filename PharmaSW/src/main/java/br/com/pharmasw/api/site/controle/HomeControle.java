package br.com.pharmasw.api.site.controle;

import br.com.pharmasw.api.site.servico.SiteProdutoServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
