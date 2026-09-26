package br.com.pharmasw.api.model.dto;

import br.com.pharmasw.api.model.enums.StatusPedido;

public record PedidoDTO(Long codigo, double valor, StatusPedido status) {
    public PedidoDTO(Long codigo, double valor, StatusPedido status) {
        this.codigo = codigo;
        this.valor = valor;
        this.status = status;
    }
}
