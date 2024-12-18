package br.com.pharmasw.api.repositorio;

import br.com.pharmasw.api.modelo.Produto;
import br.com.pharmasw.api.modelo.Retorno.ProdutoDTO;
import br.com.pharmasw.api.modelo.enums.Status;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProdutoRepositorio extends CrudRepository<Produto, Long> {

    List<Produto> findAllByStatus(Status status);

    List<ProdutoDTO> findAllProdutoDTOsByStatusOrderByIdDesc(Status status);

    @Query(value = "SELECT * FROM produtos WHERE nome LIKE %:nome% AND status = :status", nativeQuery = true)
    List<Produto> buscarProdutosByNomeAndStatus(
            @Param("nome") String nome,
            @Param("status") String status);

    @Query(value = "SELECT * FROM produtos WHERE fabricante LIKE %:fabricante% AND status = :status", nativeQuery = true)
    List<Produto> buscarProdutosByFabricanteAndStatus(
            @Param("fabricante") String fabricante,
            @Param("status") String status);



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

    Produto findByIdAndStatus(Long id, Status status);

    boolean existsByNome(String nome);
}