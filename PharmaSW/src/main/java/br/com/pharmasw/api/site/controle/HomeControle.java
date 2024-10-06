package br.com.pharmasw.api.site.controle;

import br.com.pharmasw.api.modelo.Cliente;
import br.com.pharmasw.api.modelo.Filtros;
import br.com.pharmasw.api.site.servico.ClienteServico;
import br.com.pharmasw.api.site.servico.ViaCepAPI;
import br.com.pharmasw.api.site.servico.SiteProdutoServico;
import jakarta.validation.Valid;
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
    private ClienteServico clienteServico;

    @PostMapping("/cadastrar-cliente")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> cadastrarCliente(@Valid @RequestBody Cliente cliente){

        return clienteServico.cadastrar(cliente);
    }


    @GetMapping("/listar-produtos-card")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    // -> Permite que qualquer usuario acesse o endpoint -> SITE
    public ResponseEntity<?> listarProdutos( @RequestParam(name = "busca", required = false) String busca) {

        if (busca != null && !busca.isBlank()){

            if (!isValidSearchTerm(busca)) {
                return ResponseEntity.badRequest().build();
            }

            return produtoServico.listarProdutosCardBusca(busca);
        }

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
        return new ResponseEntity<>(ViaCepAPI.consultar(cep.cep), HttpStatus.OK);
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

    private boolean isValidSearchTerm(String searchTerm) {
        // Validação simples: verificar se o termo tem pelo menos 3 caracteres e não contém SQL malicioso
        return searchTerm != null && searchTerm.length() >= 3 && searchTerm.matches("^[a-zA-Z0-9\\s]+$");
    }
}
