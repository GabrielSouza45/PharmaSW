package br.com.pharmasw.api.servico.backoffice;


import br.com.pharmasw.api.modelo.Pedido;
import br.com.pharmasw.api.repositorio.PedidoRepositorio;
import br.com.pharmasw.api.servico.responseBuilder.ResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public class PedidoEstoquistaServico {

    @Autowired
    private PedidoRepositorio pedidoRepositorio;

    public ResponseEntity<?> listarTodosPedidos() {

        // Busca todos os pedidos
        List<Pedido> pedidos = pedidoRepositorio.findAllByOrderByIdDesc();

        // Constrói a resposta com os pedidos
        return new ResponseBuilder().build(pedidos, HttpStatus.OK);
    }

}
