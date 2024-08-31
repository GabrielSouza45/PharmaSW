package br.com.pharmalink.api.controle;

import br.com.pharmalink.api.modelo.Produto;
import br.com.pharmalink.api.service.ProdutoServico;
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
    @PostMapping("/listar-todos-produtos")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<List<Produto>> listarTodosProdutos() {
        List<Produto> produtosGeral = produtoServico.listarTodosProdutos();
        return new ResponseEntity<>(produtosGeral, HttpStatus.OK);
    }

    // Listagem de produtos ativos
    @PostMapping("/listar-produtos-ativos")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<List<Produto>> listarProdutosAtivos() {
        List<Produto> produtosAtivos = produtoServico.listarProdutosAtivos();
        return new ResponseEntity<>(produtosAtivos, HttpStatus.OK);
    }

    // Listagem de produtos inativos
    @PostMapping("/listar-produtos-inativos")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<List<Produto>> listarProdutosInativos() {
        List<Produto> produtosInativos = produtoServico.listarProdutosInativos();
        return new ResponseEntity<>(produtosInativos, HttpStatus.OK);
    }
}