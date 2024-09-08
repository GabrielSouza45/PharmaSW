package br.com.pharmasw.api.service;

import br.com.pharmasw.api.modelo.Filtros;
import br.com.pharmasw.api.modelo.Usuario;
import br.com.pharmasw.api.modelo.enums.Status;
import br.com.pharmasw.api.service.helpers.DataHelper;
import br.com.pharmasw.api.service.helpers.Upload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import br.com.pharmasw.api.modelo.Produto;

import br.com.pharmasw.api.repositorio.ProdutoRepositorio;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;
import java.util.Optional;


@Service
public class ProdutoServico {


    @Autowired
    private ProdutoRepositorio produtoRepositorio;


    //lista todos os produtos
    public List<Produto> listarProdutosProdutos(Filtros filtros) {

        List<Produto> produtos =
                produtoRepositorio.findByNomeOrStatus(filtros.getNome(), filtros.getStatus());

        if (produtos.isEmpty()) {
            produtos.add(new Produto());
        }

        return produtos;
    }

    //Método cadastrar os produtos
    public ResponseEntity<?> cadastrarProduto(Produto produto, MultipartFile imagem){
        boolean uploadSucesso = Upload.uploadImagem(imagem);
        if (uploadSucesso){
            if (produto.getNome() == null || produto.getNome().length() > 200) {
                return ResponseEntity.badRequest().body("O nome do produto deve ter no máximo 200 caracteres.");
            }

            if (produto.getAvaliacao() < 0 || produto.getAvaliacao() > 5) {
                return ResponseEntity.badRequest().body("A avaliação deve ser entre 0 e 5.");
            }

            if (produto.getDescricao() != null && produto.getDescricao().length() > 2000) {
                return ResponseEntity.badRequest().body("A descrição detalhada deve ter no máximo 2000 caracteres.");
            }

            if (produto.getValor() == null || produto.getValor().doubleValue() < 0) {
                return ResponseEntity.badRequest().body("O preço do produto não pode ser zero!");
            }

            if (produto.getQtd() < 0) {
                return ResponseEntity.badRequest().body("A quantidade de estoque não pode ser menor que zero");
            }

            produto.setStatus(Status.ATIVO);
            Produto produtoRTO = produtoRepositorio.save(produto);

            return new ResponseEntity<>(produtoRTO, HttpStatus.CREATED);
        }else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro");
        }
    }



    public ResponseEntity<?> alterarStatusProduto(Produto produtorequest) {

        Produto produto = produtoRepositorio.findById(produtorequest.getId()).orElse(null);

        if (produto == null) {
            return new ResponseEntity<>("Produto não encontrado!", HttpStatus.NOT_FOUND);
        }

        Status status = produto.getStatus();
        produto.setStatus(status == Status.INATIVO ? Status.ATIVO : Status.INATIVO);
        produto.setDataAlt(DataHelper.getDataHora());
        Produto produtoAtualizado = produtoRepositorio.save(produto);

        return new ResponseEntity<>(produtoAtualizado, HttpStatus.OK);
    }

}