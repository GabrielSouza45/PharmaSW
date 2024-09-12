package br.com.pharmasw.api.repositorio;

import br.com.pharmasw.api.modelo.Produto;

import br.com.pharmasw.api.modelo.enums.Status;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProdutoRepositorio extends CrudRepository<Produto, Long> {

    public List<Produto> findAllByStatus(Status status);

    Produto findProdutoByNomeAndStatus(String nome, Status status);

    @Query(value = "SELECT preco FROM produto WHERE nome = :nome AND status = 'ATIVO'", nativeQuery = true)
    String getPrecoByNomeDisponivel(@Param("nome") String nome);

    Optional<Produto> findByNome(String nome);

    @Query(value = "SELECT * " +
            " FROM produto " +
            " WHERE (:nome IS NULL OR nome LIKE %:nome%) " +
            " AND (:status IS NULL OR status = :status) " +
            " ORDER BY id DESC ", nativeQuery = true)
    List<Produto> findByNomeOrStatus(String nome, Status status);

    Produto findByNomeAndStatus(String nomeProduto, Status status);
}