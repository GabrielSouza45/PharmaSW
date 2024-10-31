package br.com.pharmasw.api.modelo;

import br.com.pharmasw.api.modelo.enums.Status;
import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name = "produtos")
public class Produto {

    //ATRIBUTOS PADRÃO
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String nome;
    private String fabricante;
    private String categoria;
    private String descricao;
    private Double valor;
    private Double peso;
    private Integer quantidadeEstoque;
    private Double avaliacao;

    @OneToMany(fetch = FetchType.LAZY)
    private List<ImagemProduto> imagensProd;

    @Transient
    private String imagemPrincipal;
    @Transient
    private List<byte[]> imagens;


    public Produto() {

    }

    public Long getId() {
        return id;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getFabricante() {
        return fabricante;
    }

    public void setFabricante(String fabricante) {
        this.fabricante = fabricante;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public Double getPeso() {
        return peso;
    }

    public void setPeso(Double peso) {
        this.peso = peso;
    }

    public Integer getQuantidadeEstoque() {
        return quantidadeEstoque;
    }

    public void setQuantidadeEstoque(Integer quantidadeEstoque) {
        this.quantidadeEstoque = quantidadeEstoque;
    }

    public Double getAvaliacao() {
        return avaliacao;
    }

    public void setAvaliacao(Double avaliacao) {
        this.avaliacao = avaliacao;
    }

    public String getImagemPrincipal() {
        return imagemPrincipal;
    }

    public void setImagemPrincipal(String imagemPrincipal) {
        this.imagemPrincipal = imagemPrincipal;
    }

    public List<byte[]> getImagens() {
        return imagens;
    }

    public void setImagens(List<byte[]> imagens) {
        this.imagens = imagens;
    }

    @Override
    public String toString() {
        return "Produto{" +
                "id=" + id +
                ", status=" + status +
                ", nome='" + nome + '\'' +
                ", fabricante='" + fabricante + '\'' +
                ", categoria='" + categoria + '\'' +
                ", descricao='" + descricao + '\'' +
                ", valor=" + valor +
                ", peso=" + peso +
                ", quantidadeEstoque=" + quantidadeEstoque +
                ", avaliacao=" + avaliacao +
                ", imagemPrincipal='" + imagemPrincipal + '\'' +
                '}';
    }
}

