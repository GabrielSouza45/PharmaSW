package br.com.pharmasw.api.service;

import br.com.pharmasw.api.modelo.Filtros;
import br.com.pharmasw.api.modelo.ImagemProduto;
import br.com.pharmasw.api.modelo.Retorno.ProdutoDTO;
import br.com.pharmasw.api.modelo.enums.Status;
import br.com.pharmasw.api.repositorio.ImagemProdutoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import br.com.pharmasw.api.modelo.Produto;

import br.com.pharmasw.api.repositorio.ProdutoRepositorio;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
public class ProdutoServico {

    private static final String PASTA_IMAGEM = "uploads/imagens/produtos/";

    @Autowired
    private ProdutoRepositorio produtoRepositorio;
    @Autowired
    private ImagemProdutoRepositorio imagemProdutoRepositorio;


    //lista os produtos com filtros
    public ResponseEntity<?> listarProdutos(Filtros filtros) {

        List<Produto> produtos =
                produtoRepositorio.findByNomeOrStatus(filtros.getNome(), filtros.getStatus());

        return new ResponseEntity<>(constroiRetornoProdutoDTO(produtos), HttpStatus.OK);
    }

    //Listar Imagens
//    public ResponseEntity<?>


    //Método cadastrar os produtos
    public ResponseEntity<?> cadastrarProduto(Produto produto, List<MultipartFile> imagens) {

        produto.setStatus(Status.ATIVO);
        Produto produtoSalvo = produtoRepositorio.save(produto);

        try {

            this.cadastrarImagem(produtoSalvo, imagens);

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

    private void cadastrarImagem(Produto produtoSalvo, List<MultipartFile> imagens) throws IOException {

        Path pastaProduto = Paths.get(PASTA_IMAGEM + produtoSalvo.getId());
        Files.createDirectories(pastaProduto);

        for (MultipartFile imagem : imagens) {
            String nomeImagem = UUID.randomUUID().toString() + ".jpg";
            Path caminhoImagem = pastaProduto.resolve(nomeImagem);

            Files.copy(imagem.getInputStream(), caminhoImagem, StandardCopyOption.REPLACE_EXISTING);

            ImagemProduto imagemProduto = new ImagemProduto();
            imagemProduto.setCaminho(caminhoImagem.toString());
            imagemProduto.setPrincipal(produtoSalvo.getImagemPrincipal().equals(imagem.getOriginalFilename()));
            imagemProduto.setProduto(produtoSalvo);
            imagemProduto.setStatus(Status.ATIVO);

            imagemProdutoRepositorio.save(imagemProduto);
        }

    }

}