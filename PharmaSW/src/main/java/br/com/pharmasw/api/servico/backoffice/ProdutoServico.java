package br.com.pharmasw.api.servico.backoffice;

import br.com.pharmasw.api.servico.backoffice.helpers.PaginationHelper;
import br.com.pharmasw.api.modelo.Filtros;
import br.com.pharmasw.api.modelo.ImagemProduto;
import br.com.pharmasw.api.modelo.Produto;
import br.com.pharmasw.api.modelo.Retorno.ProdutoDTO;
import br.com.pharmasw.api.modelo.enums.Status;
import br.com.pharmasw.api.repositorio.ImagemProdutoRepositorio;
import br.com.pharmasw.api.repositorio.ProdutoRepositorio;
import br.com.pharmasw.api.servico.responseBuilder.ResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    @Autowired
    private ImagemProdutoRepositorio imagemProdutoRepositorio;
    @Autowired
    private PaginationHelper<ProdutoDTO> paginationHelper;


    //lista os produtos com filtros
    public ResponseEntity<?> listarProdutosPagination(Filtros filtros) {

        int paginaAtual = filtros.getPagina() - 1;

        List<Produto> produtos = produtoRepositorio.findByNomeOrStatus(
                filtros.getNome(),
                filtros.getStatus() != null ? filtros.getStatus().toString() : null,
                paginationHelper.TAMANHO,
                paginationHelper.getOffet(paginaAtual)
        );

        Integer totalProdutos = produtoRepositorio.totalProdutos(
                filtros.getNome(),
                filtros.getStatus() != null ? filtros.getStatus().toString() : null
        );

        List<ProdutoDTO> dtos = new ArrayList<>();
        if (produtos.isEmpty()) {
            dtos.add(new ProdutoDTO(new Produto()));
        } else {
            produtos.forEach(produto -> {
                dtos.add(new ProdutoDTO(produto));
            });
        }

        Page<ProdutoDTO> page = paginationHelper.transformarEmPage(dtos, paginaAtual, totalProdutos);

        return new ResponseBuilder().build(page, HttpStatus.OK);
    }


    //listar produtos para edição. Retorna todos os dados
    public ResponseEntity<?> listarProdutos(Filtros filtros) {

        Produto produto = produtoRepositorio.findById(filtros.getId()).orElse(null);

        return new ResponseBuilder().build(produto, HttpStatus.OK);
    }


    //Metodo cadastrar os produtos
    public ResponseEntity<?> cadastrarProduto(Produto produto, List<MultipartFile> imagens) {

        Produto produtoExiste =
                produtoRepositorio.findByNomeAndFabricanteAndStatus(produto.getNome(), produto.getFabricante(), Status.ATIVO);

        if (produtoExiste != null)
            return new ResponseBuilder().build("Produto já cadastrado.", HttpStatus.UNAUTHORIZED);

        produto.setStatus(Status.ATIVO);
        Produto produtoSalvo = produtoRepositorio.save(produto);

        try {
            if (!imagens.isEmpty()) {
                this.imagemProdutoServico.cadastrar(produtoSalvo, imagens);
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseBuilder().build("Erro ao cadastrar imagens.", HttpStatus.BAD_GATEWAY);
        }

        return new ResponseBuilder().build(produtoSalvo, HttpStatus.CREATED);
    }


    public ResponseEntity<?> alterarStatusProduto(Produto produtorequest) {

        Produto produto = produtoRepositorio.findById(produtorequest.getId()).orElse(null);

        if (produto == null) {
            return new ResponseBuilder().build("Produto não encontrado!", HttpStatus.NOT_FOUND);
        }

        Status status = produto.getStatus();

        produto.setStatus(status == Status.INATIVO ? Status.ATIVO : Status.INATIVO);
        Produto produtoAtualizado = produtoRepositorio.save(produto);

        return new ResponseBuilder().build(produtoAtualizado, HttpStatus.OK);
    }

    //Alterar a quantidade do produto
    public ResponseEntity<?> alterarQuantidade(Produto produtoRequest) {
        // Busca o produto pelo ID
        Produto produto = produtoRepositorio.findById(produtoRequest.getId()).orElse(null);

        if (produto == null) {
            return new ResponseBuilder().build("Produto não encontrado!", HttpStatus.NOT_FOUND);
        }

        produto.setQuantidadeEstoque(produtoRequest.getQuantidadeEstoque());

        Produto produtoAtualizado = produtoRepositorio.save(produto);

        return new ResponseBuilder().build(produtoAtualizado, HttpStatus.OK);
    }

    // Alterar Produto
    public ResponseEntity<?> alterarProduto(Produto produtoRequest, ImagemProduto[] imagemProduto, List<MultipartFile> imagens) {
        Produto produto = produtoRepositorio.findById(produtoRequest.getId()).orElse(null);

        if (produto == null) {
            return new ResponseBuilder().build("Produto não encontrado!", HttpStatus.NOT_FOUND);
        }

        // Atualizar os campos que foram passados no request
        produto.setNome(produtoRequest.getNome() != null ? produtoRequest.getNome() : produto.getNome());
        produto.setValor(produtoRequest.getValor() != null ? produtoRequest.getValor() : produto.getValor());
        produto.setQuantidadeEstoque(produtoRequest.getQuantidadeEstoque() != null ? produtoRequest.getQuantidadeEstoque() : produto.getQuantidadeEstoque());
        produto.setDescricao(produtoRequest.getDescricao() != null ? produtoRequest.getDescricao() : produto.getDescricao());
        produto.setAvaliacao(produtoRequest.getAvaliacao() != null ? produtoRequest.getAvaliacao() : produto.getAvaliacao());
        System.out.println(produtoRequest.getFabricante());
        produto.setFabricante(produtoRequest.getFabricante() != null ? produtoRequest.getFabricante() : produto.getFabricante());

        // Salvar alterações
        Produto produtoAtualizado = produtoRepositorio.save(produto);
        produtoAtualizado.setImagemPrincipal(produtoRequest.getImagemPrincipal());
        try {
            if (imagemProduto.length > 0) {
                this.imagemProdutoServico.alterar(produtoAtualizado, imagemProduto);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseBuilder().build("Erro ao alterar imagens.", HttpStatus.BAD_GATEWAY);
        }

        try {
            if (!imagens.isEmpty()) {
                this.imagemProdutoServico.cadastrar(produtoAtualizado, imagens);
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseBuilder().build("Erro ao cadastrar imagens.", HttpStatus.BAD_GATEWAY);
        }

        return ResponseEntity.ok(produtoAtualizado);
    }
}