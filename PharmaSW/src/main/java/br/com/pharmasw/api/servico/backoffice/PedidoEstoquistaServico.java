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

    private final PedidoRepositorio pedidoRepositorio;

    @Autowired
    public PedidoEstoquistaServico(PedidoRepositorio pedidoRepositorio) {
        this.pedidoRepositorio = pedidoRepositorio;
    }

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
        // Aqui você implementaria a lógica para atualizar o status do pedido
        // Lógica fictícia para exemplificar
        Pedido pedido = pedidoRepositorio.findById(idPedido).orElse(null);
        if (pedido == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pedido não encontrado.");
        }
        pedido.setStatusPedido(novoStatus);
        pedidoRepositorio.save(pedido);
        return ResponseEntity.ok("Status do pedido atualizado com sucesso.");
    }
}
