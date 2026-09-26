package br.com.pharmasw.api.repository;

import br.com.pharmasw.api.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepositorio extends JpaRepository<Pedido, Long> {


    List<Pedido> findAllByClienteIdOrderByIdDesc(Long idCliente);
    List<Pedido> findAllByOrderByIdDesc();
    List<Pedido> findAll();

}
