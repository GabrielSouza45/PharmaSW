package br.com.pharmasw.api.controle;

import br.com.pharmasw.api.modelo.Filtros;
import br.com.pharmasw.api.modelo.Produto;
import br.com.pharmasw.api.servico.ProdutoServico;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/produto-controle")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@PreAuthorize("hasRole('ADMIN') or hasRole('ESTOQUISTA')")
public class ProdutoControle {

    @Autowired
    private ProdutoServico produtoServico;

    // Listagem de todos os produtos (ativos e inativos)
    @PostMapping("/listar-produtos")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ESTOQUISTA')") // -> Permite que usuarios ADMIN e ESTOQUISTA acessem o endpoint
    public ResponseEntity<?> listarTodosProdutos(@RequestBody Filtros filtros) {

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
        if (imagens.isEmpty())
            return new ResponseEntity<>("Imagens são obrigatórias.", HttpStatus.BAD_REQUEST);

        Produto produto = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            produto = objectMapper.readValue(jsonProduto, Produto.class);
        } catch (JsonProcessingException e){
            return new ResponseEntity<>("Erro ao processar Json do produto.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return produtoServico.cadastrarProduto(produto, imagens);
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


}