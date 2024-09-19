package br.com.pharmasw.api.repositorio;

import br.com.pharmasw.api.modelo.ImagemProduto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImagemProdutoRepositorio extends JpaRepository<ImagemProduto, Long> {


    List<ImagemProduto> findByProdutoId(Long id);

    List<ImagemProduto> findByProdutoIdOrderByPrincipalDesc(Long id);

}
