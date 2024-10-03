package br.com.pharmasw.api.site.controle;

import br.com.pharmasw.api.modelo.Filtros;
import br.com.pharmasw.api.site.servico.CorreiosAPI;
import br.com.pharmasw.api.site.servico.SiteProdutoServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/home-controle")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class HomeControle {

    @Autowired
    private SiteProdutoServico produtoServico;
    @Autowired
    private CorreiosAPI correiosAPI;


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

    @PostMapping("/consultar-cep")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> listarProduto(@RequestBody Cep cep) {
        return new ResponseEntity<>(correiosAPI.consultar(cep.cep), HttpStatus.OK);
    }

    public static class Cep{
        private String cep;

        public Cep() { }

        public String getCep() {
            return cep;
        }

        public void setCep(String cep) {
            this.cep = cep;
        }
    }
}
