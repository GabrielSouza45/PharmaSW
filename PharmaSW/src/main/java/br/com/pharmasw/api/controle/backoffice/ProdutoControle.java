package br.com.pharmasw.api.controle.backoffice;

import br.com.pharmasw.api.servico.site.servico.ProdutoServico;
import br.com.pharmasw.api.modelo.Filtros;
import br.com.pharmasw.api.modelo.ImagemProduto;
import br.com.pharmasw.api.modelo.Produto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/produto-controle")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@PreAuthorize("hasRole('ADMIN') or hasRole('ESTOQUISTA')")
public class ProdutoControle {

    @Autowired
    private ProdutoServico produtoServico;

    // Listagem de todos os produtos (ativos e inativos)
    @PostMapping("/listar-produtos-pagination")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ESTOQUISTA')")
    // -> Permite que usuarios ADMIN e ESTOQUISTA acessem o endpoint
    public ResponseEntity<?> listarTodosProdutos(@RequestBody Filtros filtros) {

        return produtoServico.listarProdutosPagination(filtros);

    }

    @PostMapping("/listar-produtos")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ESTOQUISTA')")
    // -> Permite que usuarios ADMIN e ESTOQUISTA acessem o endpoint
    public ResponseEntity<?> listarProdutos(@RequestBody Filtros filtros) {

        return produtoServico.listarProdutos(filtros);

    }


    // CADASTRAR
    @PostMapping(value = "/cadastrar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('ADMIN')") // -> Permite que apenas usuarios ADMIN acessem o endpoint
    public ResponseEntity<?> CadastrarProdutos(
            @RequestPart("produto") String jsonProduto,
            @RequestPart("imagens") List<MultipartFile> imagens) {
        if (jsonProduto.isBlank())
            return new ResponseEntity<>("Produto não pode ser null.", HttpStatus.BAD_REQUEST);

        Produto produto = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            produto = objectMapper.readValue(jsonProduto, Produto.class);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>("Erro ao processar Json do produto.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return produtoServico.cadastrarProduto(produto, imagens);
    }

    @PutMapping("/alterar-produto")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('ADMIN')") // Permite que apenas usuários ADMIN acessem o endpoint
    public ResponseEntity<?> alterarProduto(
            @RequestPart("produto") String jsonProduto,
            @RequestPart(value = "imagensEdicao", required = false) String jsonImagensEdicao,
            @RequestPart(value = "imagens", required = false) List<MultipartFile> imagens) {

        if (jsonProduto.isBlank())
            return new ResponseEntity<>("Produto não pode ser null.", HttpStatus.BAD_REQUEST);

        ObjectMapper objectMapper = new ObjectMapper();
        Produto produto = null;
        ImagemProduto[] imagensProdutoEdicao = null;
        if (imagens == null) {
            imagens = new ArrayList<>();
        }
        try {
            produto = objectMapper.readValue(jsonProduto, Produto.class);
        } catch (JsonProcessingException e) {
            System.out.println(e);
            return new ResponseEntity<>("Erro ao processar Json do produto.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        try {
            if (!jsonImagensEdicao.isBlank()) {
                imagensProdutoEdicao = objectMapper.readValue(jsonImagensEdicao, ImagemProduto[].class);
            }
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>("Erro ao processar Json da imagem.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // Chama o método de serviço para alterar o produto
        return produtoServico.alterarProduto(produto, imagensProdutoEdicao, imagens);
    }


    @PutMapping("/mudar-status")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('ADMIN')") // -> Permite que apenas usuarios ADMIN acessem o endpoint
    public ResponseEntity<?> alterarStatusProduto(@RequestBody Produto produto) {

        if (produto.getId() == null) {
            return ResponseEntity.badRequest().body("Id não pode ser null!");
        }

        return produtoServico.alterarStatusProduto(produto);
    }

    // Alterar quantidade do produto
    @PutMapping("/alterar-quantidade")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ESTOQUISTA')")
    // Permite que apenas usuarios ADMIN e ESTOQUISTA acessem o endpoint
    public ResponseEntity<?> alterarQuantidadeProduto(@RequestBody Produto produtoRequest) {
        if (produtoRequest.getId() == null) {
            return ResponseEntity.badRequest().body("Id do produto não pode ser null!");
        }
        if (produtoRequest.getQuantidadeEstoque() == null) {
            return ResponseEntity.badRequest().body("A quantidade do estoque não pode ser nulo!");
        }

        // Chama o método de serviço para alterar a quantidade
        return produtoServico.alterarQuantidade(produtoRequest);
    }
}