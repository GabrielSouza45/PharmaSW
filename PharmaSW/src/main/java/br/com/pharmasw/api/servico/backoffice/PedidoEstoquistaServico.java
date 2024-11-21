package br.com.pharmasw.api.servico.backoffice;

import br.com.pharmasw.api.modelo.Pedido;
import br.com.pharmasw.api.repositorio.PedidoRepositorio;
import br.com.pharmasw.api.modelo.enums.StatusPedido;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoEstoquistaServico {

    @Autowired
    private PedidoRepositorio pedidoRepositorio;

    public ResponseEntity<?> listarTodosPedidos() {
        List<Pedido> pedidos = pedidoRepositorio.findAllByOrderByIdDesc(); // Método genérico
        if (pedidos.isEmpty()) {
            System.out.println("Nenhum pedido encontrado no banco.");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Nenhum pedido encontrado.");
        }
        System.out.println("Pedidos encontrados: " + pedidos.size());
        return ResponseEntity.ok(pedidos); // Retorna os pedidos com status 200
    }

    public ResponseEntity<?> atualizarStatus(Long idPedido, StatusPedido novoStatus) {
        Pedido pedido = pedidoRepositorio.findById(idPedido).orElse(null);
        if (pedido == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pedido não encontrado.");
        }
        pedido.setStatusPedido(novoStatus);
        pedidoRepositorio.save(pedido);
        return ResponseEntity.ok("Status do pedido atualizado com sucesso.");
    }
}
