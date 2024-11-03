package br.com.pharmasw.api.repositorio;

import br.com.pharmasw.api.modelo.MetodosPagamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MetodosPagamentoRepositorio extends JpaRepository<MetodosPagamento, Long> {
}
