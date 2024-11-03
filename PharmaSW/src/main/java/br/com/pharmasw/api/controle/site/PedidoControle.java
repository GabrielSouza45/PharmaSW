package br.com.pharmasw.api.controle.site;

import br.com.pharmasw.api.modelo.Pedido;
import br.com.pharmasw.api.servico.site.PedidoServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pedido-controle")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PedidoControle {

    @Autowired
    private PedidoServico pedidoServico;

    @PostMapping("/cadastrar")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> cadastrarPedido(@RequestBody Pedido pedido){

        if (pedido.getIdCliente() == null)
            return new ResponseEntity<>("IdCliente é obrigatório!", HttpStatus.BAD_REQUEST);

        if (pedido.getIdEndereco() == null)
            return new ResponseEntity<>("IdEndereco é obrigatório!", HttpStatus.BAD_REQUEST);

        if (pedido.getIdMetodoPagamento() == null)
            return new ResponseEntity<>("IdMetodoPagamento é obrigatório!", HttpStatus.BAD_REQUEST);

        return pedidoServico.cadastrarPedido(pedido);
    }
}
