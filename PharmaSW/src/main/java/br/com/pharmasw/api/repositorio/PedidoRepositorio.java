package br.com.pharmasw.api.repositorio;

import br.com.pharmasw.api.modelo.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepositorio extends JpaRepository<Pedido, Long> {

    List<Pedido> findAllByClienteId(Long id);

    List<Pedido> findAllByClienteIdOrderByIdDesc(Long idCliente);
}
