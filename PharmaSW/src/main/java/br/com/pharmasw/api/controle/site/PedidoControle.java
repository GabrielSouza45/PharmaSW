package br.com.pharmasw.api.controle.site;

import br.com.pharmasw.api.modelo.Pedido;
import br.com.pharmasw.api.servico.responseBuilder.ResponseBuilder;
import br.com.pharmasw.api.servico.site.PedidoServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pedido-controle")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PedidoControle {

    @Autowired
    private PedidoServico pedidoServico;

    @PostMapping("/cadastrar")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CLIENTE')")
    public ResponseEntity<?> cadastrarPedido(@RequestBody Pedido pedido){

        if (pedido.getIdCliente() == null)
            return new ResponseBuilder().build("IdCliente é obrigatório!", HttpStatus.BAD_REQUEST);

        if (pedido.getIdEndereco() == null)
            return new ResponseBuilder().build("IdEndereco é obrigatório!", HttpStatus.BAD_REQUEST);

        if (pedido.getIdMetodoPagamento() == null)
            return new ResponseBuilder().build("IdMetodoPagamento é obrigatório!", HttpStatus.BAD_REQUEST);

        return pedidoServico.cadastrarPedido(pedido);
    }

    @GetMapping("/listar-por-cliente")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CLIENTE')")
    public ResponseEntity<?> ListarPedidos(@RequestParam(value = "idCliente", required = true) Long idCliente){

        if (idCliente == null)
            return new ResponseBuilder().build("IdCliente é obrigatório!", HttpStatus.BAD_REQUEST);

        return pedidoServico.listarPorCliente(idCliente);
    }

    @GetMapping("/detalhar-pedido")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CLIENTE')")
    public ResponseEntity<?> detalharPedido(@RequestParam(value = "idPedido", required = true) Long idPedido){

        if (idPedido == null)
            return new ResponseBuilder().build("IdPedido é obrigatório!", HttpStatus.BAD_REQUEST);

        return pedidoServico.detalharPedido(idPedido);
    }


}
