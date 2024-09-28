package br.com.pharmasw.api.site.servico;

import br.com.pharmasw.api.backoffice.servico.ImagemProdutoServico;
import br.com.pharmasw.api.backoffice.servico.helpers.PaginationHelper;
import br.com.pharmasw.api.modelo.Retorno.ProdutoCardDTO;
import br.com.pharmasw.api.modelo.Retorno.ProdutoDTO;
import br.com.pharmasw.api.modelo.enums.Status;
import br.com.pharmasw.api.repositorio.ImagemProdutoRepositorio;
import br.com.pharmasw.api.repositorio.ProdutoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class SiteProdutoServico {

    @Autowired
    private ProdutoRepositorio produtoRepositorio;
    @Autowired
    private ImagemProdutoServico imagemProdutoServico;

    //listar produtos para cards do site. Retorna a imagem principal e os dados pertinentes do produto
    public ResponseEntity<?> listarProdutosCard(){

        List<ProdutoDTO> produtoDTO = produtoRepositorio.findAllProdutoDTOsByStatus(Status.ATIVO);

        List<ProdutoCardDTO> produtosCardDTO = imagemProdutoServico.getImagensCardDTO(produtoDTO);

        return new ResponseEntity<>(produtosCardDTO, HttpStatus.OK);

    }

}
