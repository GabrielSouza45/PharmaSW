package br.com.pharmasw.api.modelo;

import jakarta.persistence.Embeddable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;

@Embeddable
public class ItemPedido {
    @ManyToOne
    private Produto produto;

    private String codigoProduto;
    private Double valorUnitario;
    private Integer qtdProdutos;

    @Transient
    private Long idProduto;


    public ItemPedido() {

    }


    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public String getCodigoProduto() {
        return codigoProduto;
    }

    public void setCodigoProduto(String codigoProduto) {
        this.codigoProduto = codigoProduto;
    }

    public Double getValorUnitario() {
        return valorUnitario;
    }

    public void setValorUnitario(Double valorUnitario) {
        this.valorUnitario = valorUnitario;
    }

    public Integer getQtdProdutos() {
        return qtdProdutos;
    }

    public void setQtdProdutos(Integer qtdProdutos) {
        this.qtdProdutos = qtdProdutos;
    }

    public Long getIdProduto() {
        return idProduto;
    }

    public void setIdProduto(Long idProduto) {
        this.idProduto = idProduto;
    }
}


