package br.com.pharmasw.api.controle.backoffice;

import br.com.pharmasw.api.modelo.ImagemProduto;
import br.com.pharmasw.api.modelo.Produto;
import br.com.pharmasw.api.servico.backoffice.ImagemProdutoServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/imagem-produto")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ImagemProdutoControle {

    @Autowired
    private ImagemProdutoServico imagemProdutoServico;

    @PostMapping("/listar")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ESTOQUISTA')")
    public ResponseEntity<?> listarImagensProdutos(@RequestBody Produto produto){
        if (produto.getId() == null)
            return new ResponseEntity<>("Id é obrigatório.", HttpStatus.BAD_REQUEST);

        return this.imagemProdutoServico.listarImagensProduto(produto);
    }



    @PutMapping("/excluir-imagem")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> excluirImagem(@RequestBody ImagemProduto imagemProduto) {
        if(imagemProduto.getId() == null){
            return new ResponseEntity<>("Id é obrigatório.", HttpStatus.BAD_REQUEST);
        }
        return imagemProdutoServico.excluirImagem(imagemProduto.getId());
    }
}
