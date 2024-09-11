package br.com.pharmasw.api.service;

import br.com.pharmasw.api.modelo.Filtros;
import br.com.pharmasw.api.modelo.Retorno.ProdutoDTO;
import br.com.pharmasw.api.modelo.Retorno.UsuarioDTO;
import br.com.pharmasw.api.modelo.Usuario;
import br.com.pharmasw.api.modelo.enums.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import br.com.pharmasw.api.modelo.Produto;

import br.com.pharmasw.api.repositorio.ProdutoRepositorio;


import java.util.ArrayList;
import java.util.List;


@Service
public class ProdutoServico {


    @Autowired
    private ProdutoRepositorio produtoRepositorio;


    //lista os produtos com filtros
    public ResponseEntity<?> listarProdutos(Filtros filtros) {

        List<Produto> produtos =
                produtoRepositorio.findByNomeOrStatus(filtros.getNome(), filtros.getStatus());

        return new ResponseEntity<>(constroiRetornoProdutoDTO(produtos), HttpStatus.OK);
    }


    //Método cadastrar os produtos
    



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