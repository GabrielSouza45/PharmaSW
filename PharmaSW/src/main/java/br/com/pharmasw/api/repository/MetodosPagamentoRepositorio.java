package br.com.pharmasw.api.repository;

import br.com.pharmasw.api.model.MetodosPagamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MetodosPagamentoRepositorio extends JpaRepository<MetodosPagamento, Long> {
}
