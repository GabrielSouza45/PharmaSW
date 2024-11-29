package br.com.pharmasw.api.controle.backoffice;

import br.com.pharmasw.api.modelo.enums.StatusPedido;
import br.com.pharmasw.api.servico.backoffice.PedidoEstoquistaServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pedido-estoquista-controle")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PedidoEstoquistaControle {

    @Autowired
    private PedidoEstoquistaServico pedidoEstoquistaServico;

    @GetMapping("/listar-todos")
    @PreAuthorize("hasRole('ESTOQUISTA')")
    public ResponseEntity<?> listarTodosPedidos() {
        return pedidoEstoquistaServico.listarTodosPedidos();
    }

    @PutMapping("/atualizar-status")
    @PreAuthorize("hasRole('ESTOQUISTA')")
    public ResponseEntity<?> atualizarStatusPedido(
            @RequestParam Long idPedido,
            @RequestParam StatusPedido novoStatus) {
        return pedidoEstoquistaServico.atualizarStatus(idPedido, novoStatus);
    }
}
