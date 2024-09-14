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

    @Query(value = "SELECT preco FROM produtos WHERE nome = :nome AND status = 'ATIVO'", nativeQuery = true)
    String getPrecoByNomeDisponivel(@Param("nome") String nome);

    Optional<Produto> findByNome(String nome);

    @Query(value = "SELECT * FROM produtos WHERE (:nome IS NULL OR nome LIKE %:nome%) AND (:status IS NULL OR status = :status) ORDER BY id DESC LIMIT :limit OFFSET :offset ",
            nativeQuery = true)
    List<Produto> findByNomeOrStatus(@Param("nome") String nome,
                                     @Param("status") String status,
                                     @Param("limit") int limit,
                                     @Param("offset") int offset
    );

    @Query(value = "SELECT COUNT(*) FROM produtos WHERE (:nome IS NULL OR nome LIKE %:nome%) AND (:status IS NULL OR status = :status)",
            nativeQuery = true)
    Integer totalProdutos(@Param("nome") String nome, @Param("status") String status);

    Produto findByNomeAndStatus(String nomeProduto, Status status);

    Produto findByNomeAndFabricanteAndStatus(String nome, String fabricante, Status status);
}