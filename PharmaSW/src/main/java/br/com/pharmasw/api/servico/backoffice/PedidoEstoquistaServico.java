package br.com.pharmasw.api.servico.backoffice;


import br.com.pharmasw.api.modelo.Pedido;
import br.com.pharmasw.api.modelo.enums.StatusPedido;
import br.com.pharmasw.api.repositorio.PedidoRepositorio;
import br.com.pharmasw.api.servico.responseBuilder.ResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public class PedidoEstoquistaServico {

    @Autowired
    private PedidoRepositorio pedidoRepositorio;

    public ResponseEntity<?> listarTodosPedidos() {

        // Busca todos os pedidos
        List<Pedido> pedidos = pedidoRepositorio.findAllByOrderByIdDesc();

        // Constrói a resposta com os pedidos
        return new ResponseBuilder().build(pedidos, HttpStatus.OK);
    }

    public ResponseEntity<?> atualizarStatus(Long idPedido, StatusPedido novoStatus) {
        Optional<Pedido> pedidoOpt = pedidoRepositorio.findById(idPedido);

        if (pedidoOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pedido não encontrado.");
        }

        Pedido pedido = pedidoOpt.get();
        pedido.setStatusPedido(novoStatus);
        pedidoRepositorio.save(pedido);

        return ResponseEntity.ok("Status atualizado com sucesso.");
    }


}
