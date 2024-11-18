package br.com.pharmasw.api.controle.backoffice;

import br.com.pharmasw.api.modelo.enums.StatusPedido;
import br.com.pharmasw.api.servico.backoffice.PedidoEstoquistaServico;
import br.com.pharmasw.api.servico.responseBuilder.ResponseBuilder;
import br.com.pharmasw.api.servico.site.PedidoServico;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pedido-estoquista-controle")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PedidoEstoquistaControle {

    private PedidoEstoquistaServico pedidoEstoquistaServico;

    @GetMapping("/listar-todos")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('ESTOQUISTA')")
    public ResponseEntity<?> listarTodosPedidos() {
        return pedidoEstoquistaServico.listarTodosPedidos();
    }

    @PatchMapping("/atualizar-status")
    @PreAuthorize("hasRole('ESTOQUISTA')")
    public ResponseEntity<?> atualizarStatusPedido(
            @RequestParam Long idPedido,
            @RequestParam StatusPedido novoStatus) {

        return pedidoEstoquistaServico.atualizarStatus(idPedido, novoStatus);
    }
}
