package br.com.pharmasw.api.modelo;

import br.com.pharmasw.api.modelo.enums.Status;
import jakarta.persistence.*;

import java.util.Date;


@Entity
@Table(name = "produto")
public class Produto {

    //ATRIBUTOS PADRÃO
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String nome;
    private String categoria;
    private Double valor;
    private Double peso;


    public Produto() {

    }


    public Long getId() {
        return id;
    }


    // public void setId(Long id) {
    //      this.id = id;
    //   }


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


    public String getCategoria() {
        return categoria;
    }


    public void setCategoria(String categoria) {
        this.categoria = categoria;
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

}