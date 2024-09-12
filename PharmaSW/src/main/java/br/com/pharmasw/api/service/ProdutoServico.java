package br.com.pharmasw.api.service;

import br.com.pharmasw.api.modelo.Filtros;
import br.com.pharmasw.api.modelo.enums.Status;
import br.com.pharmasw.api.service.helpers.DataHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.pharmasw.api.modelo.Produto;

import br.com.pharmasw.api.repositorio.ProdutoRepositorio;


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

}