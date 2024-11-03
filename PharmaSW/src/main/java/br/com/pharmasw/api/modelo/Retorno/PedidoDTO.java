package br.com.pharmasw.api.modelo.Retorno;

public record PedidoDTO(Long codigo, double valor) {
    public PedidoDTO(Long codigo, double valor) {
        this.codigo = codigo;
        this.valor = valor;
    }
}
