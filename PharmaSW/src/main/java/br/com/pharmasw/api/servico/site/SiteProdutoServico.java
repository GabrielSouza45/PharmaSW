package br.com.pharmasw.api.servico.site;

import br.com.pharmasw.api.modelo.Filtros;
import br.com.pharmasw.api.modelo.Produto;
import br.com.pharmasw.api.modelo.Retorno.ProdutoCardDTO;
import br.com.pharmasw.api.modelo.Retorno.ProdutoDTO;
import br.com.pharmasw.api.modelo.Retorno.ProdutoSiteDTO;
import br.com.pharmasw.api.modelo.enums.Status;
import br.com.pharmasw.api.repositorio.ProdutoRepositorio;
import br.com.pharmasw.api.servico.backoffice.ImagemProdutoServico;
import br.com.pharmasw.api.servico.responseBuilder.ResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;

@Controller
public class SiteProdutoServico {

    @Autowired
    private ProdutoRepositorio produtoRepositorio;
    @Autowired
    private ImagemProdutoServico imagemProdutoServico;


    //listar produtos para cards do site. Retorna a imagem principal e os dados pertinentes do produto
    public ResponseEntity<?> listarProdutosCard() {

        List<ProdutoDTO> produtoDTO = produtoRepositorio.findAllProdutoDTOsByStatusOrderByIdDesc(Status.ATIVO);

        if (produtoDTO.isEmpty())
            return new ResponseBuilder().build(HttpStatus.NOT_FOUND);

        List<ProdutoCardDTO> produtosCardDTO = imagemProdutoServico.getImagensCardDTO(produtoDTO);

        return new ResponseBuilder().build(produtosCardDTO, HttpStatus.OK);

    }

    public ResponseEntity<?> listarProdutosCardBusca(String busca) {

        System.out.println("\n \n \n BUSCA : " + busca);
        List<Produto> produtos = produtoRepositorio.buscarProdutosByNomeAndStatus(busca, Status.ATIVO.toString());
        System.out.println("length: " + produtos.size());
        if (produtos.isEmpty())
            produtos = produtoRepositorio.buscarProdutosByFabricanteAndStatus(busca, Status.ATIVO.toString());

        if (produtos.isEmpty())
            return new ResponseBuilder().build(HttpStatus.NOT_FOUND);

        List<ProdutoDTO> produtosDTO = getProdutosDTO(produtos);

        List<ProdutoCardDTO> produtosCardDTO = imagemProdutoServico.getImagensCardDTO(produtosDTO);

        return new ResponseBuilder().build(produtosCardDTO, HttpStatus.OK);
    }

    private List<ProdutoDTO> getProdutosDTO(List<Produto> produtos) {
        List<ProdutoDTO> produtosDTO = new ArrayList<>();

        produtos.forEach(prod -> {
            produtosDTO.add(new ProdutoDTO(prod));
        });

        return produtosDTO;
    }

    public ResponseEntity<?> listarProdutoPorId(Filtros filtro) {

        Produto produto =
                produtoRepositorio.findByIdAndStatus(filtro.getId(), Status.ATIVO);

        if (produto == null) {
            produto =
                    produtoRepositorio.findByNomeAndStatus(filtro.getNome(), Status.ATIVO);
            if (produto == null)
                return new ResponseBuilder().build("Produto não encontrado.", HttpStatus.NOT_FOUND);
        }
        List<byte[]> imagens = imagemProdutoServico.getImagensPorIdProduto(produto.getId());
        produto.setImagens(imagens);

        ProdutoSiteDTO prodDTO = new ProdutoSiteDTO(produto);

        return new ResponseBuilder().build(prodDTO, HttpStatus.OK);
    }
}
