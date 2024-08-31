package br.com.pharmasw.api.service;

import br.com.pharmasw.api.modelo.enums.Status;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Produto> listarTodosProdutos() {
        return produtoRepositorio.findAll();
    }

    public List<Produto> listarProdutosAtivos() {
        return produtoRepositorio.findAllByStatus(Status.ATIVO);
    }

    public List<Produto> listarProdutosInativos() {
        return produtoRepositorio.findAllByStatus(Status.INATIVO);
    }




    //Método cadastrar os produtos
    

    //Desativando usuário 
    public void desativarProduto(Long id) {
        Optional<Produto> produto = produtoRepositorio.findById(id);
        if (produto.isPresent()) {
            Produto produ = produto.get();
            produ.setStatus(Status.INATIVO);
            produtoRepositorio.save(produ);
        }
    }

    //Desativando usuário 
    public void ativarProduto(Long id) {
        Optional<Produto> produto = produtoRepositorio.findById(id);
        if (produto.isPresent()) {
            Produto produ = produto.get();
            produ.setStatus(Status.ATIVO);
            produtoRepositorio.save(produ);
        }
    }
}