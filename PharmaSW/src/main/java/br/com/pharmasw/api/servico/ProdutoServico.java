package br.com.pharmasw.api.servico;

import br.com.pharmasw.api.modelo.Filtros;
import br.com.pharmasw.api.modelo.Produto;
import br.com.pharmasw.api.modelo.Retorno.ProdutoDTO;
import br.com.pharmasw.api.modelo.enums.Status;
import br.com.pharmasw.api.repositorio.ProdutoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@Service
public class ProdutoServico {


    @Autowired
    private ProdutoRepositorio produtoRepositorio;
    @Autowired
    private ImagemProdutoServico imagemProdutoServico;


    //lista os produtos com filtros
    public ResponseEntity<?> listarProdutos(Filtros filtros) {

        System.out.println(filtros.getStatus());
        List<Produto> produtos = produtoRepositorio.findByNomeOrStatus(
                filtros.getNome(),
                filtros.getStatus() != null ? filtros.getStatus().toString() : null
        );

        return new ResponseEntity<>(constroiRetornoProdutoDTO(produtos), HttpStatus.OK);
    }

    //Listar Imagens
//    public ResponseEntity<?>


    //Metodo cadastrar os produtos
    public ResponseEntity<?> cadastrarProduto(Produto produto, List<MultipartFile> imagens) {

        Produto produtoExiste =
                produtoRepositorio.findByNomeAndFabricanteAndStatus(produto.getNome(), produto.getFabricante(), Status.ATIVO);

        if (produtoExiste != null)
            return new ResponseEntity<>("Produto já cadastrado.", HttpStatus.UNAUTHORIZED);

        produto.setStatus(Status.ATIVO);
        Produto produtoSalvo = produtoRepositorio.save(produto);

        try {

            this.imagemProdutoServico.cadastrar(produtoSalvo, imagens);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Erro ao cadastrar imagens.", HttpStatus.BAD_GATEWAY);
        }

        return new ResponseEntity<>(produtoSalvo, HttpStatus.CREATED);
    }


    public ResponseEntity<?> alterarStatusProduto(Produto produtorequest) {

        Produto produto = produtoRepositorio.findById(produtorequest.getId()).orElse(null);

        if (produto == null) {
            return new ResponseEntity<>("Produto não encontrado!", HttpStatus.NOT_FOUND);
        }

        Status status = produto.getStatus();
        produto.setStatus(status == Status.INATIVO ? Status.ATIVO : Status.INATIVO);
        Produto produtoAtualizado = produtoRepositorio.save(produto);

        return new ResponseEntity<>(produtoAtualizado, HttpStatus.OK);
    }

    private List<ProdutoDTO> constroiRetornoProdutoDTO(List<Produto> produtos) {

        List<ProdutoDTO> retorno = new ArrayList<>();

        if (produtos.isEmpty()) {
            retorno.add(new ProdutoDTO(new Produto()));
            return retorno;
        }

        for (Produto produto : produtos) {
            retorno.add(new ProdutoDTO(produto));
        }

        return retorno;
    }


}