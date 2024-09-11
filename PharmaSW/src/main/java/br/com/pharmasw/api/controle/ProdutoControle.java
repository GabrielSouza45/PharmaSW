package br.com.pharmasw.api.controle;

import br.com.pharmasw.api.modelo.Filtros;
import br.com.pharmasw.api.modelo.Produto;
import br.com.pharmasw.api.modelo.Usuario;
import br.com.pharmasw.api.service.ProdutoServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping("/cadastrarProduto")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> cadastrarProduto(
            @RequestPart("produto") Produto produto,
            @RequestPart("file") MultipartFile file) {

        // Verificação de campos obrigatórios do produto
        if (produto.getNome() == null || produto.getNome().isBlank()
                || produto.getAvaliacao() == 0
                || produto.getDescricao() == null || produto.getDescricao().isBlank()
                || produto.getValor() == null
                || produto.getQtd() == 0) {
            return ResponseEntity.badRequest().body("Todos os campos obrigatórios devem ser preenchidos.");
        }

        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body("O arquivo da imagem é obrigatório.");
        }

        // Chama o upload da imagem
        try {
            return produtoServico.cadastrarProduto(produto, file);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar produto.");
        }
    }


}