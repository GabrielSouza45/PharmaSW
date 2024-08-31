package br.com.pharmalink.api.repositorio;

import br.com.pharmalink.api.modelo.Produto;

import br.com.pharmalink.api.modelo.enums.Status;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProdutoRepositorio extends CrudRepository<Produto, Long> {

    public List<Produto> findAllByStatus(Status status);

    @Override
    List<Produto> findAll();
    
    Produto findProdutoByNomeAndStatus(String nome, Status status);

    @Query(value = "SELECT preco FROM produto WHERE nome = :nome AND status = 'DISPONIVEL'", nativeQuery = true)
    String getPrecoByNomeDisponivel(@Param("nome") String nome);

    Optional<Produto> findByNome(String nome);
}