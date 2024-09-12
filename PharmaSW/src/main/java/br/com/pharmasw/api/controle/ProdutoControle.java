package br.com.pharmasw.api.controle;

import br.com.pharmasw.api.modelo.Filtros;
import br.com.pharmasw.api.modelo.Produto;
import br.com.pharmasw.api.modelo.Usuario;
import br.com.pharmasw.api.service.ProdutoServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produto-controle")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProdutoControle {

    @Autowired
    private ProdutoServico produtoServico;

    // Listagem de todos os produtos (ativos e inativos)
    @PostMapping("/listar-produtos")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<List<Produto>> listarTodosProdutos(Filtros filtros) {

        List<Produto> produtosGeral = produtoServico.listarProdutosProdutos(filtros);

        return new ResponseEntity<>(produtosGeral, HttpStatus.OK);

    }

    @PutMapping("/mudar-status")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> alterarStatusUsuario(@RequestBody Produto produto) {

        if (produto.getId() == null) {
            return ResponseEntity.badRequest().body("Id não pode ser null!");
        }

        return produtoServico.alterarStatusProduto(produto);
    }

}