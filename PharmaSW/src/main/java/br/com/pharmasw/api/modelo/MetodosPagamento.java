package br.com.pharmasw.api.modelo;

import br.com.pharmasw.api.modelo.enums.MetodoPagamento;
import jakarta.persistence.*;

@Entity(name = "metodos_pagamento")
@Table(name = "metodos_pagamento")
public class MetodosPagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private MetodoPagamento metodoPagamento;

    public MetodosPagamento() {
    }

    public MetodosPagamento(MetodoPagamento metodoPagamento) {
        this.metodoPagamento = metodoPagamento;
    }

    public Long getId() {
        return id;
    }

    public MetodoPagamento getMetodoPagamento() {
        return metodoPagamento;
    }

    public void setMetodoPagamento(MetodoPagamento metodoPagamento) {
        this.metodoPagamento = metodoPagamento;
    }
}
