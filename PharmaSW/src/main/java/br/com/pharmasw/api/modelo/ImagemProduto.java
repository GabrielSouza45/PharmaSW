package br.com.pharmasw.api.modelo;

import br.com.pharmasw.api.modelo.enums.Status;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import org.springframework.security.core.userdetails.UserDetails;

@Entity(name = "imagem_produto")
@Table(name = "imagem_produto")
@EqualsAndHashCode(of = "id")
public class ImagemProduto {

    //ATRIBUTOS PADRÃO
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Status status;


    private String caminho;
    private boolean principal;

    @OneToOne
    @JoinColumn(name = "id")
    private Produto produto;


    public ImagemProduto() {
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

    public String getCaminho() {
        return caminho;
    }

    public void setCaminho(String caminho) {
        this.caminho = caminho;
    }

    public boolean isPrincipal() {
        return principal;
    }

    public void setPrincipal(boolean principal) {
        this.principal = principal;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }
}
